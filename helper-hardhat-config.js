const { ethers } = require("hardhat")

const networkConfig = {
    default: {
        name: "hardhat",
        keepersUpdateInterval: "30",
    },
    11155111: {
        name: "sepolia",
        vrfCoordinatorV2: "0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625",
        entranceFee: ethers.utils.parseEther("0.1"),
        gasLane: "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c",
        subscriptionId: "1055",
        callBackGasLimit: "500000", // 500,000
        keepersUpdateInterval: "30",
    },

    31337: {
        name: "localhost",
        entranceFee: ethers.utils.parseEther("0.1"),
        gasLane: "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c",
        callBackGasLimit: "500000", // 500,000
        keepersUpdateInterval: "30",
    },

    1: {
        name: "mainnet",
        keepersUpdateInterval: "30",
    },
}

const developmentsChains = ["hardhat", "localhost"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6
module.exports = {
    networkConfig,
    developmentsChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
}
