import { gql } from "@apollo/client";
import { client } from ".";

export const getProductById = async (productId) => {
  try {
    const response = await client.query({
      query: gql`
        query {
          product(id: "${productId}") {
            __typename @skip(if: true)
            id
            name
            category
            description
            prices {
              currency {
                label
                symbol
              }
              amount
            }
            attributes {
              __typename @skip(if: true)
              id
              name
              type
              items {
                __typename @skip(if: true)
                displayValue
                value
                id
              }
            }
            gallery
            brand
            inStock
          }
        }
      `,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const response = await client.query({
      query: gql`
      query {
        category (input: {title: "${category}"}) {
          name
          products {
            __typename @skip(if: true)
            id
            category
            name
            inStock
            gallery
            brand
            prices {
              currency {
                label
                symbol
              }
              amount
            }
            attributes {
              __typename @skip(if: true)
              id
              name
              type
              items {
                displayValue
                value
                id
              }
            }
          }
        }
      }
      `,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrencies = async () => {
  try {
    const response = await client.query({
      query: gql`
        query {
          currencies {
            label
            symbol
          }
        }
      `,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
