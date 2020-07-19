// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
// import useCachedResources from './hooks/useCachedResources';
// import useColorScheme from './hooks/useColorScheme';
// import Navigation from './navigation';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});

const EXCHANGE_RATES= gql`
  query GetRates {
    rates (currency: "USD") {
      currency
    }
  }
`;

function ExchangeRates() {
  const { loading, error, data } = useQuery(gql`
    {
      rates(currency: "USD") {
        currency
        rate
      }
    }
  `);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  return data.rates.map(({ currency, rate }) => (
    <View key={currency}>
      <Text>
        {currency}: {rate}
      </Text>
    </View>
  ));
}

class App extends React.Component{

  componentDidMount(){}
  // const isLoadingComplete = useCachedResources();
  // const colorScheme = useColorScheme();
  render(){
    return  <SafeAreaProvider>
        <ApolloProvider client={client}>
          <ExchangeRates />
        {/* <Navigation colorScheme={colorScheme} />
          <StatusBar /> */}
        </ApolloProvider>
    </SafeAreaProvider>
  }
}

export default App;