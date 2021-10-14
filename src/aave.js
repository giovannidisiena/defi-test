const LendingPoolV2Artifact = require("@aave/protocol-v2/artifacts/contracts/protocol/lendingpool/LendingPool.sol/LendingPool.json");
const ethers = require("ethers");

const userAddress = "0x1b7835d2074914161dD6A2d48E393Be1dbf296D1";
const contractAddress = "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9";

const provider = ethers.providers.getDefaultProvider("mainnet", {
  infura: "https://mainnet.infura.io/v3/" + process.env.INFURA_ID,
});

const lendingPoolV2Contract = new ethers.Contract(
  contractAddress,
  LendingPoolV2Artifact.abi,
  provider
);

let blockNumber;
provider.getBlockNumber().then(function (_blockNumber) {
  blockNumber = _blockNumber;
});

lendingPoolV2Contract
  .getUserAccountData(userAddress)
  .then((userAccountData) => {
    if (
      userAccountData.healthFactor._hex ==
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    ) {
      console.log("User has no outstanding debt positions in mainnet AAVE V2");
    } else {
      console.log(
        `Health factor: ${ethers.utils
          .formatEther(userAccountData.healthFactor)
          .toString()} \nat block height ${blockNumber}`
      );
    }
  });
