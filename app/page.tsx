import { gql } from '@apollo/client';
import { getClient } from '@/lib/client';

const userQuery = gql`
  query {
    getUser(id: "1") {
      id
      name
    }
  }
`;

const Home = async () => {
  const { data } = await getClient().query({ query: userQuery });
  console.log('🚀🚀🚀 ~ Home ~ data:', data);

  return <div>asd</div>;
};

export default Home;
