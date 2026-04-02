import Hero from './sections/Hero';
import Cupcakes from './sections/Cupcakes';
import CustomCakes from './sections/CustomCakes';
import CookiesBrownies from './sections/CookiesBrownies';
import Customizer from './sections/Customizer';
import Contact from './sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Cupcakes />
      <CustomCakes />
      <CookiesBrownies />
      <Customizer />
      <Contact />
    </main>
  );
}
