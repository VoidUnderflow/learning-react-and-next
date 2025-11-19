export default function BackgroundImage() {
  return (
    <>
      {/* Mobile Light */}
      <img
        src="/images/bg-mobile-light.jpg"
        alt=""
        className="block sm:hidden dark:hidden absolute top-0 left-0 w-full h-[250px] object-cover z-0"
      />

      {/* Mobile Dark */}
      <img
        src="/images/bg-mobile-dark.jpg"
        alt=""
        className="hidden sm:hidden dark:block absolute top-0 left-0 w-full h-[250px] object-cover z-0"
      />

      {/* Desktop Light */}
      <img
        src="/images/bg-desktop-light.jpg"
        alt=""
        className="hidden sm:block dark:hidden absolute top-0 left-0 w-full h-[300px] object-cover z-0"
      />

      {/* Desktop Dark */}
      <img
        src="/images/bg-desktop-dark.jpg"
        alt=""
        className="hidden sm:dark:block absolute top-0 left-0 w-full h-[300px] object-cover z-0"
      />
    </>
  );
}
