const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  const currentDate = new Date().getTime()
  const COLLECTION_NAME = `5ea91a55 Token`;
  // const CONTRACT_META = 'https://ipfs.io/ipfs/QmVs58TkJbPAj8GvyeCfzLE1w8nvepj5a3U2oftE581cxD/contractMeta.json';
  const SYMBOL = 'SEAGLASS'; //5ea91a55
  const CAP = '1000';
  //let proxyRegistryAddress = '0xa5409ec958c83c3f309868babaca7c86dcb077c1';
  // proxyRegistryAddress = '0xf57b2c51ded3a29e6891aba85459d600256cf317';

  const signers = await ethers.getSigners();
  const addresses = await Promise.all(signers.map(async signer => signer.getAddress()));

  const deployer = { provider: signers[0].provider, signer: signers[0], address: addresses[0] };
  console.log(`Deploying contracts from: ${deployer.address}`);

  let Tiny721 = await ethers.getContractFactory("Tiny721");
  //let c721 = await C721.connect(deployer.signer).deploy(COLLECTION_NAME, SYMBOL, CONTRACT_META, proxyRegistryAddress);
  let glass721 = await Tiny721.connect(deployer.signer).deploy(COLLECTION_NAME, SYMBOL, CAP);

  await glass721.deployed();
  console.log(`* Glass721 deployed to: ${glass721.address}`);
  // console.log(`[$]: npx hardhat verify --network rinkeby ${c721.address} ${COLLECTION_NAME} ${SYMBOL} ${CONTRACT_META} ${proxyRegistryAddress}`);
  console.log(`[$]: npx hardhat verify --network rinkeby ${glass721.address} ${COLLECTION_NAME} ${SYMBOL} ${CAP} `);

  let send1 = await glass721.mint_Qgo(deployer.address, 30);
  await send1.wait();
  console.log(`* minted tokens to: ${deployer.address}`);

  let send2 = await glass721.mint_Qgo(deployer.address, 30);
  await send2.wait();
  console.log(`* minted tokens to: ${deployer.address}`);

  let send3 = await glass721.mint_Qgo(deployer.address, 30);
  await send3.wait();
  console.log(`* minted tokens to: ${deployer.address}`);

  let send4 = await glass721.mint_Qgo(deployer.address, 30);
  await send4.wait();
  console.log(`* minted tokens to: ${deployer.address}`);

  let send5 = await glass721.mint_Qgo(deployer.address, 30);
  await send5.wait();
  console.log(`* minted tokens to: ${deployer.address}`);

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
