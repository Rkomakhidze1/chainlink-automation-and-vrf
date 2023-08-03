const { assert, expect } = require("chai");
const { ethers } = require("hardhat");
const { deployFundMe } = require("../scripts/deploy");

describe("FundMe", function () {
  let fundMe;
  let deployer;
  const sendValue = ethers.utils.parseEther("10");
  beforeEach(async () => {
    const accounts = await ethers.getSigners();
    deployer = accounts[0];
    fundMe = await deployFundMe();
  });

  describe("fund", function () {
    // https://ethereum-waffle.readthedocs.io/en/latest/matchers.html
    // could also do assert.fail
    it("Fails if you don't send enough ETH", async () => {
      await expect(fundMe.fund()).to.be.revertedWith(
        "You need to spend more ETH!"
      );
    });
    // we could be even more precise here by making sure exactly $50 works
    // but this is good enough for now
    it("Updates the amount funded data structure", async () => {
      await fundMe.fund({ value: sendValue });

      const response = await fundMe.getAddressToAmountFunded(deployer.address);

      assert.equal(response.toString(), sendValue.toString());
    });
    it("Adds funder to array of funders", async () => {
      await fundMe.fund({ value: sendValue });
      const response = await fundMe.getFunder(0);
      assert.equal(response, deployer.address);
    });
  });
});
