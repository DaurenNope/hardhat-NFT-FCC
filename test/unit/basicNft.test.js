const { assert } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
?describe.skip
:describe("Basic NFT Unit test", function() {
    let BasicNFT, deployer
    
    beforeEach(async () => {
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        await deployments.fixture(["BasicNFT"])
        BasicNFT = await ethers.getContract("BasicNFT")
    })

    it("Allows users to mint an NFT, and updates appropriately", async function() {
        const txResponse = await BasicNFT.mintNft()
        await txResponse.wait(1)
        const tokenURI = await BasicNFT.tokenURI(0)
        const tokenCounter = await BasicNFT.getTokenCounter()

        assert.equal(tokenCounter.toString(), "1")
        assert.equal(tokenURI, await BasicNFT.TOKEN_URI())
    })
})

