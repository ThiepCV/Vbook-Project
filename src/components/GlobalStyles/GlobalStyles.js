import { useMediaQuery } from 'react-responsive'
import "./GlobalStyles.scss";

const Example = () => {
    
}
function GlobalStyles({children}){
    const isDesktopOrLaptop = useMediaQuery({
      query: '(min-width: 1224px)'
    })
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
    return children;
}
export default GlobalStyles;