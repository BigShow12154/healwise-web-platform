
import Layout from '@/components/Layout';
import WearableDataDisplay from '@/components/dashboard/WearableDataDisplay';

const WearablesPage = () => {
  return (
    <Layout>
      <div className="container">
        <WearableDataDisplay />
      </div>
    </Layout>
  );
};

export default WearablesPage;
