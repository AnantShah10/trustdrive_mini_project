// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // const [owner, from1, from2, from3, from4] = await hre.ethers.getSigners();
  const contract_code = await hre.ethers.getContractFactory('ProductDetails');
  const contract = await contract_code.deploy();
  await contract.deployed();
  console.log("Address of contract: ", contract.address);
  // const addresses = [owner.address, from1.address, from2.address, from3.address, from4.address];
  console.log("Manufacturer trying to add product ---> ");
  const ma1 = await contract.addProduct("Manufacturer Abc", "132", "1234", "product abc", "this is product abc", "Transporter Abc");
  console.log("Product Added ^^^ ");
  const ma2 = await contract.addProduct("Manufacturer Abc", "132", "1124", "product abc", "this is product abc", "Transporter Abc");
  console.log("Product Added ^^^ ");
  console.log("Transporter trying to add transport ---> ");
  const tr = await contract.addTranport("Transporter Abc", "234", "1234", "product abc", "Transporting address", "Distributor Abc");
  console.log("Transport Added ^^^ ");
  console.log("Distributor trying to add distribute ---> ");
  const di = await contract.addDistribute("Distributor Abc", "345", "1234", "product abc", "Address of vendor", "Vendor Abc");
  console.log("Distribute Added ^^^ ");
  console.log("Vendor trying to add vendor ---> ");
  const ve = await contract.addVendor("Vendor Abc", "Vendor Location", "1234", "product abc");
  console.log("Vendor Added ^^^ ");
  console.log("Checking Genuinty ---> ");
  const prodhas = await contract.callStatic.checkgenuine("1124");
  console.log(ve, prodhas, "Genuity checked ^^^ ");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
