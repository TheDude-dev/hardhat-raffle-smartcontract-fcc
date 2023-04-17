const { assert, expect } = require("chai")
const { getNamedAccounts, deployments, ethers, network } = require("hardhat")
const { developmentsChains, networkConfig } = require("../../helper-hardhat-config")

developmentsChains.includes(network.name)
    ? describe.skip
    : describe("Raffle staging Tests", async () => {
          let raffle, raffleEntranceFee, deployer
          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              raffle = await ethers.getContract("Raffle", deployer)
              raffleEntranceFee = await raffle.getEntranceFee()
          })

          describe("fullfillRandomWords", function () {
              it("works with Live Chainlink keepers and Chainlink VRF, we get a random winner", async () => {
                  //enter the raffle
                  const startingTimeStamp = await raffle.getLatestTimeStamp()
                  const accounts = await ethers.getSigners()
                  // this happens after we enter
                  await new Promise(async (resolve, reject) => {
                      raffle.once("WinnerPicked", async () => {
                          console.log("WinnerPicked event fired!")
                          try {
                              //add our asserts here one the promise's been resolved
                              const recentWinner = await raffle.getRecentWinner()
                              const raffleState = await raffle.getRaffleState()
                              const winnerEndingBalance = await accounts[0].getBalance()
                              const endingTimeStamp = await raffle.getLatestTimeStamp()

                              await expect(raffle.getPlayer(0)).to.be.reverted
                              assert.equal(recentWinner.toString(), accounts[0].address)
                              assert.equal(raffleState, 0)
                              assert.equal(
                                  winnerEndingBalance.toString(),
                                  winnerStartingBalance.add(raffleEntranceFee.toString())
                              )
                              assert(endingTimeStamp > startingTimeStamp)
                              resolve()
                          } catch (error) {
                              console.log(error)
                              reject(e)
                          }
                      })
                      //we enter the raffle and the chainlink does the rest then the promise kicks in
                      console.log("Entering Raffle...")

                      const tx = await raffle.enterRaffle({ value: raffleEntranceFee })
                      await tx.wait(1)
                      console.log("Ok, time to wait...")
                      const winnerStartingBalance = await accounts[0].getBalance()
                  })
                  //set up a listener before we enter the raffle
                  //Just in case the blockchain moves Really fast
                  //await raffle.enterRaffle({value: raffleEntranceFee})
              })
          })
      })
