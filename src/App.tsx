import CurrencyList from './components/CurrencyList';
import UserSettings from './components/UserSettings';
import { NotificationSystem } from './components/notifications';
import { AppProvider } from './context/AppContext';


export default function App() {
  return (
    <AppProvider>
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <UserSettings />
        {/* Adicionamos o NotificationSystem entre UserSettings e CurrencyList */}
        <NotificationSystem />
        <CurrencyList />
      </main>
    </AppProvider>
  );
}