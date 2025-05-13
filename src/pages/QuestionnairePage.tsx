
import Layout from '@/components/Layout';
import HealthQuestionnaire from '@/components/questionnaire/HealthQuestionnaire';

const QuestionnairePage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-medical">健康问诊</h1>
        <HealthQuestionnaire />
      </div>
    </Layout>
  );
};

export default QuestionnairePage;
