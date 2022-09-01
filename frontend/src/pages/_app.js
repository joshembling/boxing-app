import 'styles/style.scss'
import MainLayout from '@/components/UI/MainLayout'

const App = ({ Component, pageProps }) => (
    <MainLayout>
        <Component {...pageProps} />
    </MainLayout>
)

export default App
