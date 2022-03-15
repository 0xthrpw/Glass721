const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  const currentDate = new Date().getTime()
  const COLLECTION_NAME = `GLASS-${currentDate}`;
  const METADATA_URI = 'https://ipfs.io/ipfs/QmVs58TkJbPAj8GvyeCfzLE1w8nvepj5a3U2oftE581cxD/';
  // const CONTRACT_META = 'https://ipfs.io/ipfs/QmVs58TkJbPAj8GvyeCfzLE1w8nvepj5a3U2oftE581cxD/contractMeta.json';
  const SYMBOL = 'GLASS'; //5ea91a55
  const CAP = '10000';
  //let proxyRegistryAddress = '0xa5409ec958c83c3f309868babaca7c86dcb077c1';
  // proxyRegistryAddress = '0xf57b2c51ded3a29e6891aba85459d600256cf317';

  const signers = await ethers.getSigners();
  const addresses = await Promise.all(signers.map(async signer => signer.getAddress()));

  const deployer = { provider: signers[0].provider, signer: signers[0], address: addresses[0] };
  console.log(`Deploying contracts from: ${deployer.address}`);

  let Tiny721 = await ethers.getContractFactory("Tiny721");
  //let c721 = await C721.connect(deployer.signer).deploy(COLLECTION_NAME, SYMBOL, CONTRACT_META, METADATA_URI, proxyRegistryAddress);
  let erc721A = await Tiny721.connect(deployer.signer).deploy(COLLECTION_NAME, SYMBOL, METADATA_URI, CAP);

  await erc721A.deployed();
  console.log(`* erc721A deployed to: ${erc721A.address}`);
  // console.log(`[$]: npx hardhat verify --network rinkeby ${c721.address} ${COLLECTION_NAME} ${SYMBOL} ${CONTRACT_META} ${METADATA_URI} ${proxyRegistryAddress}`);
  console.log(`[$]: npx hardhat verify --network rinkeby ${erc721A.address} ${COLLECTION_NAME} ${SYMBOL} ${METADATA_URI} ${CAP} `);

  let send1 = await erc721A.mint_Qgo(deployer.address, 20);
  await send1.wait();
  console.log(`* minted tokens to: ${deployer.address}`);

  let send2 = await erc721A.mint_Qgo(deployer.address, 20);
  await send2.wait();
  console.log(`* minted tokens to: ${deployer.address}`);

  let send3 = await erc721A.mint_Qgo(deployer.address, 20);
  await send3.wait();
  console.log(`* minted tokens to: ${deployer.address}`);

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
