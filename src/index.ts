import { v1, v2, ReserveData, UserReserveData } from "@aave/protocol-js/";
import {
  ReserveData as v1ReserveData,
  UserReserveData as v1UserReserveData,
} from "@aave/protocol-js/dist/v1";
import { GraphQLClient, gql } from "graphql-request";

async function main() {
  const v1Endpoint: string =
    "https://api.thegraph.com/subgraphs/name/aave/protocol-multy-raw";
  const v2Endpoint: string =
    "https://api.thegraph.com/subgraphs/name/aave/protocol-v2";

  const v1GraphQLClient = new GraphQLClient(v1Endpoint, { headers: {} });
  const v2GraphQLClient = new GraphQLClient(v2Endpoint, { headers: {} });

  const userAddress: string = "0x1b7835d2074914161dD6A2d48E393Be1dbf296D1";

  const v1PoolReservesDataQuery: string = gql`
    {
      reserves(where: { isActive: true }) {
        ...ReserveData
      }
    }
  `;

  const v1RawUserReservesQuery: string = gql`
    {
      userReserves(where: { user: userAddress }) {
        ...UserReserveData
      }
    }
  `;

  const v2PoolReservesDataQuery: string = gql`
    {
      reserves(where: { isActive: true }) {
        ...ReserveData
      }
    }
  `;

  const v2RawUserReservesQuery: string = gql`
    {
      userReserves(where: { user: userAddress }) {
        ...UserReserveData
      }
    }
  `;

  const ethPriceUSDQuery: string = gql`
    {
      priceOracle(id: "1") {
        usdPriceEth
      }
    }
  `;

  const handleError = (error: any) => {
    let errorMessage = "";
    if (error.response) {
      errorMessage =
        "Received " +
        error.response.status +
        " error in AAVE Graph API response. Try refreshing data again.";
    }
    if (error.request) {
      errorMessage =
        "Received no response from AAVE Graph API request. Try refreshing data again.";
    } else {
      errorMessage =
        "AAVE Graph API Error, try refreshing data again. Message: " +
        error.message;
    }
    return [true, errorMessage];
  };

  let v1PoolReservesData: v1ReserveData[] = new Array<v1ReserveData>(),
    v1RawUserReserves: v1UserReserveData[] = new Array<v1UserReserveData>(),
    v2PoolReservesData: ReserveData[] = new Array<ReserveData>(),
    v2RawUserReserves: UserReserveData[] = new Array<UserReserveData>(),
    ethPriceUSD: string = "";

  await v1GraphQLClient
    .request(v1PoolReservesDataQuery)
    .then((data) => {
      v2PoolReservesData = data.data.reserves;
    })
    .catch((error) => {
      handleError(error);
    });

  await v1GraphQLClient
    .request(v1RawUserReservesQuery)
    .then((data) => {
      v2RawUserReserves = data.data.userReserves;
    })
    .catch((error) => {
      handleError(error);
    });

  await v2GraphQLClient
    .request(v2PoolReservesDataQuery)
    .then((data) => {
      v2PoolReservesData = data.data.reserves;
    })
    .catch((error) => {
      handleError(error);
    });

  await v2GraphQLClient
    .request(v2RawUserReservesQuery)
    .then((data) => {
      v2RawUserReserves = data.data.userReserves;
    })
    .catch((error) => {
      handleError(error);
    });

  await v2GraphQLClient
    .request(ethPriceUSDQuery)
    .then((data) => {
      ethPriceUSD = data.data.priceOracle.usdPriceEth;
    })
    .catch((error) => {
      handleError(error);
    });

  const v1UserSummary = v1.formatUserSummaryData(
    v1PoolReservesData,
    v1RawUserReserves,
    userAddress.toLowerCase(),
    ethPriceUSD,
    Math.floor(Date.now() / 1000)
  );

  const rewardsInfo = {} as any;

  const v2UserSummary = v2.formatUserSummaryData(
    v2PoolReservesData,
    v2RawUserReserves,
    userAddress.toLowerCase(),
    ethPriceUSD,
    Math.floor(Date.now() / 1000),
    rewardsInfo
  );

  if (v1UserSummary.healthFactor == "-1") {
    console.log("User has no outstanding debt positions in mainnet AAVE V1");
  } else {
    console.log(`Health factor V1: ${v1UserSummary.healthFactor}`);
  }

  if (v2UserSummary.healthFactor == "-1") {
    console.log("User has no outstanding debt positions in mainnet AAVE V2");
  } else {
    console.log(`Health factor V2: ${v2UserSummary.healthFactor}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
