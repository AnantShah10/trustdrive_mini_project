const hre = require("hardhat");

async function main() {
    const ProductDetails = await hre.ethers.getContractFactory("ProductDetails");
    const contract = await ProductDetails.deploy();
    
    await contract.deployed();
    console.log("Address of contract: ", contract.address);
}
main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});