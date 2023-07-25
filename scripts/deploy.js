const { ethers, network } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config");
const DECIMALS = "8";
const INITIAL_PRICE = "200000000000";

async function main() {}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

module.exports = {
  deployFundMe,
  INITIAL_PRICE,
};
