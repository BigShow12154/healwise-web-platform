
import Layout from '@/components/Layout';
import BodySymptomSelector from '@/components/symptoms/BodySymptomSelector';

const SymptomsPage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-medical">症状记录</h1>
        <BodySymptomSelector />
      </div>
    </Layout>
  );
};

export default SymptomsPage;
