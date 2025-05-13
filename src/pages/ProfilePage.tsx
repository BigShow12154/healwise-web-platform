
import Layout from '@/components/Layout';
import PersonalInfoForm from '@/components/profile/PersonalInfoForm';

const ProfilePage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-medical">个人信息</h1>
        <PersonalInfoForm />
      </div>
    </Layout>
  );
};

export default ProfilePage;
