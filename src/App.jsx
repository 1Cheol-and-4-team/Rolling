import { StyleGuide } from '@/pages/StyleGuide';
import { RecipientProvider } from '@/contexts/RecipientProvider';

function App() {
  return (
    <>
      <RecipientProvider>
        <StyleGuide />
      </RecipientProvider>
    </>
  );
}

export default App;
