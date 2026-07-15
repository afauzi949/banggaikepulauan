"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Pointer } from "lucide-react";
import { Highlight, MapInfoCard } from "@/components/molecules/MapInfoCard";
import { Container } from "@/components/atoms/Container";
import { useLanguage } from "@/context/LanguageContext";
import { IslandInformations, keywordsToBold } from "@/lib/map-data";
import { cn } from "@/lib/utils";

export function highlightWords(text: string, keywords: string[]) {
  const escapedKeywords = keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`\\b(${escapedKeywords.join("|")})\\b`, "gi");

  const parts = text.split(regex);

  return parts.map((part, i) =>
    keywords.some((k) => k.toLowerCase() === part.toLowerCase()) ? (
      <Highlight key={i}>{part}</Highlight>
    ) : (
      part
    ),
  );
}

export function PetaInteraktifSection() {
  const { t } = useLanguage();
  const [selectedIsland, setSelectedIsland] = useState<string>("island-main");

  const handleClick = (id: string) => {
    setSelectedIsland(id);
  };

  const currentInfo = IslandInformations[selectedIsland] || IslandInformations["island-main"];
  const nameKey = `map.name.${selectedIsland}`;
  const descKey = `map.description.${selectedIsland}`;

  const finalName = t(nameKey) !== nameKey ? t(nameKey) : currentInfo.name;
  const finalDesc = t(descKey) !== descKey ? t(descKey) : currentInfo.description;

  return (
    <Container as="section" className="py-16 md:py-20 overflow-hidden">
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-12">
        <motion.div
          className="relative w-full lg:max-w-none lg:flex-1 flex justify-center"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* "Tap To Interact" button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 inline-flex flex-row gap-2 items-center text-nowrap rounded-full bg-[#00274D] px-4 py-2 text-[10px] font-semibold text-white shadow-2xl md:text-sm"
          >
            <Pointer className="w-[16px] sm:w-[24px]" />
            {t("map.tapToInteract") !== "map.tapToInteract"
              ? t("map.tapToInteract")
              : "Tap To Interact"}
          </motion.div>

          <svg
            width="1087"
            height="713"
            viewBox="0 0 1087 713"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto drop-shadow-2xl"
            onClick={(e) => {
              const target = e.target as SVGPathElement;
              if (target.tagName === "path" && target.id) {
                handleClick(target.id);
              }
            }}
          >
            {/* Main Islands */}
            <path
              id="island-main"
              className={cn(
                "fill-emerald-700 transition-colors ease-in-out hover:cursor-pointer",
                selectedIsland === "island-main" ? "fill-emerald-600" : "hover:fill-emerald-600",
              )}
              d="M100.5 589L95.5 603V617.5L112.5 628L122.5 643.5L141.5 648.5H169.5L187 636.5L198 628V624H191L198 617.5L205 624V609.5L210 598.5L216.5 592L222 577.5L230 566.5L240 563L249 572.5H254.5V566.5L259.5 563L264 552L271 554.5V539.5H284.5V533L293 525.5L304 528.5V515.5L310.5 506L317 510L320 499.5L327.5 495.5V490L334.5 475.5L337.5 454L344 447.5L342 434.5L344 421.5L349 429L353 416L356.5 412L353 406L356.5 390.5H364.5V382.5L371 375L381 353L389 342.5L398.5 333L401.5 323L423 294H430.5V287.5H436.5V279.5L440 274L450 260L453.5 242.5L458.5 240.5V235L469.5 213L467 231L472 248L486 238L489.5 225.5L500.5 216.5H510L524.5 225.5L528 222.5L533.5 227L521 235L524.5 247L523.5 255L521 260L519 269L523.5 290.5L521 302.5V320.5L533.5 328.5H523.5V333L530 342.5H537.5L532 353L537.5 359L530 361L532 369.5L535.5 375L537.5 382.5L532 385L528 377H523.5L532 400L535.5 390.5L544 402L537.5 416L533.5 419V442L537.5 434.5L544 436V450L548 457.5V466L553 475.5L551 487L548 499.5L555.5 503.5L561.5 514V528L548 538.5L544 552.5L535.5 556.5L513 562L506 574L490.5 586L488.5 595L480 598.5L477 590.5L459 592L451.5 604.5L444.5 626L442.5 629.5L446.5 646L461.5 631L457.5 649L464 657.5L480 660L488.5 654.5L493.5 653L501 660L506 657.5L511.5 663.5L515 657.5L520.5 660L517 663.5L519 671L524.5 673.5L520.5 680.5V695.5L526.5 698.5L534 700.5V695.5L540 689.5L545 685.5L556 689.5L567.5 673.5L574.5 660L576.5 656L583 663.5L590.5 660L596.5 653L603 654.5L606.5 649H613L618 642L626.5 637.5L631.5 651.5L630 657.5L631.5 675L639 702L646.5 710L655.5 702L653 697L655.5 695.5L661.5 698.5L667 688L665 680.5L670.5 675L665 663.5L668.5 654.5L659.5 643.5L649.5 632.5L646.5 637.5L639 643.5V639.5L635 634.5L639 629.5L646.5 626L651 602.5H646.5L642 600.5L646.5 592L642 589L639 571H643.5V562L651 556.5L649.5 543.5L654 530L653 520.5V514L649.5 508L651 503.5L649.5 497L656 490L653 482.5H663.5L667.5 478L661 474V467.5L656 462L665.5 453L663.5 448.5V421L674 419H679.5L686 421L699 413.5V390L704 383.5L721.5 376L727.5 379.5H737.5L740.5 383.5L745 390L754.5 386L761 392.5L752.5 398.5L751 407L757.5 417L761 428L768 437.5L781.5 448.5V455L790.5 459L798 457.5L801.5 459L796.5 470L801.5 508L800 522.5L801.5 532L807 529.5L816.5 497L820 495H829.5L837.5 502L841.5 498.5L848.5 500.5L857.5 513.5L870 525V534L884.5 543L881.5 529.5L884.5 527.5H889L895 522.5L904.5 519.5L914 525L919 519.5L917 510.5L921.5 506L935 519.5L945.5 522.5V517L951 513.5L957 499.5L962 498L964.5 495L967 486.5L965 473L963.5 461V449L969.5 442.5L980 452.5H989.5L1006.5 442.5L1016.5 437.5L1024.5 426.5L1027.5 414.5L1041 394.5L1055.5 347L1064 328L1058.5 318.5L1051 305L1058.5 289L1067 279.5L1077 269L1082 258L1085 228.5L1082 207L1085 189L1077 183H1061L1051 179.5L1041 176.5L1029 164L1021 168.5L1008 174H993.5L980 168.5L971 159.5L965 150L952.5 144.5L937 133.5H930L918 127V133.5L915 148.5L921.5 162L924.5 168.5H918L915 174H899.5L886.5 162L890 156.5L883 153.5L872.5 156.5L864.5 148.5V137L874.5 127V120.5L878 116L872.5 113L864.5 103L866.5 119L858 125.5L851 122L847 111.5L841.5 109L825 107.5L806 119L785 148.5L763.5 171.5L752 209.5L741.5 225.5L724 231L718.5 225.5L705 231V238L698.5 245.5L692.5 258L696.5 264V284H702.5L701 297L692.5 306.5L676.5 326L679.5 333L662 345H648.5L645 357.5H637L634.5 351.5L624 345V339.5L637 337.5L624 326V323L619.5 316.5L624 311.5L616 300.5L607 294V311.5L603 297L599 299.5L596.5 290.5L591.5 284L587.5 274L582 266.5L574 264L569.5 253.5L564 248V253.5L559 250.5L562.5 227H567V222.5L576 213L578.5 199.5L574 182L562.5 170L567 165L582 172.5L594 180.5L603 179.5L613.5 167.5L615 148.5H620.5L624 139.5L633.5 127L635.5 131.5L647.5 122L643.5 116L624 102.5L605.5 87L603 71.5L593 60L574 39.5L567 15.5L540.5 10.5L527 15.5L525 63.5L503.5 89L507 96.5H499.5L492 89L484.5 71.5L462.5 49.5L442.5 28.5L417 42H401L386.5 47L378.5 54L375 49.5L366 54L345.5 52.5L323.5 70.5L308.5 73.5V77.5L303.5 81L298 77.5L278.5 91L272.5 88.5L262.5 94L265 103H262.5L259 109.5L255.5 105.5L252.5 107.5H249.5V100L245.5 98.5V94L223.5 66.5L209.5 60.5L198 63.5L181.5 60.5L165.5 63.5L157 69V81L152 94L139.5 103L134 109.5V127L127 135L123.5 144H120L122 155L107 169L99.5 171L77.5 189.5L70 192L58 205L55 220.5L48 235L43 238L38 255L40 268L43 276L34 287L23 299L25 311L12.5 331L16.5 337.5L12.5 343L7.5 366.5L12.5 373.5L7.5 381V399.5L12.5 406.5V423.5L7.5 427.5V435L12.5 444.5L2 446.5V457H7.5L12.5 461V471.5L7.5 473V478L14.5 490.5H19L22.5 495.5L30 492.5L24 487.5L33 485L36.5 487.5L46 485H54V495.5L61 500.5L55.5 507H50L61 519H64.5L67.5 522L61 525.5L69 536L77 539.5L82.5 541.5L78.5 546L100.5 589Z"
            />
            <path
              id="island-main"
              className={cn(
                "fill-emerald-700 transition-colors ease-in-out hover:cursor-pointer",
                selectedIsland === "island-main" ? "fill-emerald-600" : "hover:fill-emerald-600",
              )}
              d="M712.5 175L705 155L698 131.5L691.5 122.5V109.5H686.5V104L682 102L689 89.5V75.5L694 68L718.5 50.5L736.5 41.5L746.5 50.5L756.5 70.5L752.5 97L740 124.5V164.5L732.5 186L718.5 196.5L710.5 182.5L712.5 175Z"
            />
            {/* Regions */}
            <path
              id="bungin"
              className={cn(
                "transition-colors ease-in-out hover:cursor-pointer fill-yellow-400 hover:fill-yellow-300",
                selectedIsland === "bungin" && "fill-yellow-300",
              )}
              d="M689 49.5H696.5L722.5 20V13L717.5 2.5L702 7L689 18L686 34L689 49.5Z"
            />
            <path
              id="bungin"
              className={cn(
                "transition-colors ease-in-out hover:cursor-pointer fill-yellow-400 hover:fill-yellow-300",
                selectedIsland === "bungin" && "fill-yellow-300",
              )}
              d="M698.596 133.5L698 131.5L691.5 122.5V109.5H686.5V104L682 102L689 89.5V75.5L694 68L718.5 50.5L719.5 50V133.5H698.596Z"
              fill="#F9CA04"
            />
            <path
              id="bakalan"
              className={cn(
                "transition-colors ease-in-out hover:cursor-pointer fill-red-500 hover:fill-red-400",
                selectedIsland === "bakalan" && "fill-red-400",
              )}
              d="M719.5 195.75V50L736.5 41.5L746.5 50.5L756.5 70.5L752.5 97L740 124.5V164.5L732.5 186L719.5 195.75Z"
            />
            <path
              id="sambulangan"
              className={cn(
                "transition-colors ease-in-out hover:cursor-pointer fill-yellow-400 hover:fill-yellow-300",
                selectedIsland === "sambulangan" && "fill-yellow-300",
              )}
              d="M483 103.5L488 88.5V79.6667L492 89L499.5 96.5H507L503.5 89L525 63.5L525.5 51.5V145H483V103.5Z"
            />
            <path
              id="luk-panenteng"
              className={cn(
                "transition-colors ease-in-out hover:cursor-pointer fill-red-500 hover:fill-red-400",
                selectedIsland === "luk-panenteng" && "fill-red-400",
              )}
              d="M296.5 167L169 193L173.822 61.9397L181.5 60.5L198 63.5L209.5 60.5L223.5 66.5L245.5 94V98.5L249.5 100V107.5H252.5L255.5 105.5L259 109.5L262.5 103H265L262.5 94L272.5 88.5L278.5 91L298 77.5L298.98 78.1238L296.5 167Z"
            />
            <path
              id="lumbi-lumbia"
              className={cn(
                "transition-colors ease-in-out hover:cursor-pointer fill-yellow-400 hover:fill-yellow-300",
                selectedIsland === "lumbi-lumbia" && "fill-yellow-300",
              )}
              d="M159 520.5V492H54V495.5L61 500.5L55.5 507H50L61 519H64.5L66 520.5H159Z"
            />
            <path
              id="buko"
              className={cn(
                "transition-colors ease-in-out hover:cursor-pointer fill-red-500 hover:fill-red-400",
                selectedIsland === "buko" && "fill-red-400",
              )}
              d="M172.999 558V537H71.2852L77 539.5L82.5 541.5L78.5 546L84.639 558H172.999Z"
            />
            <path
              id="lolantang"
              className={cn(
                "transition-colors ease-in-out hover:cursor-pointer fill-orange-500 hover:fill-orange-400",
                selectedIsland === "lolantang" && "fill-orange-400",
              )}
              d="M401.5 323 L423 294 H430.5 V287.5 H436.5 V279.5 L440 274 L370 274 L370 323 Z"
            />
            <path
              id="leme-leme-darat"
              className={cn(
                "transition-colors ease-in-out hover:cursor-pointer fill-purple-500 hover:fill-purple-400",
                selectedIsland === "leme-leme-darat" && "fill-purple-400",
              )}
              d="M77.5 189.5 L70 192 L58 205 L55 220.5 L48 235 L43 238 L38 255 L100 255 L100 189.5 Z"
            />
            {/* Outline */}
            <path
              id="island-main"
              d="M78.5 546L82.5 541.5L77 539.5M78.5 546L100.5 589L95.5 603V617.5L112.5 628L122.5 643.5L141.5 648.5H169.5L187 636.5L198 628V624H191L198 617.5L205 624V609.5L210 598.5L216.5 592L222 577.5L230 566.5L240 563L249 572.5H254.5V566.5L259.5 563L264 552L271 554.5V539.5H284.5V533L293 525.5L304 528.5V515.5L310.5 506L317 510L320 499.5L327.5 495.5V490L334.5 475.5L337.5 454L344 447.5L342 434.5L344 421.5L349 429L353 416L356.5 412L353 406L356.5 390.5H364.5V382.5L371 375L381 353L389 342.5L398.5 333L401.5 323L423 294H430.5V287.5H436.5V279.5L440 274L450 260L453.5 242.5L458.5 240.5V235L469.5 213L467 231L472 248L486 238L489.5 225.5L500.5 216.5H510L524.5 225.5L528 222.5L533.5 227L521 235L524.5 247L523.5 255L521 260L519 269L523.5 290.5L521 302.5V320.5L533.5 328.5H523.5V333L530 342.5H537.5L532 353L537.5 359L530 361L532 369.5L535.5 375L537.5 382.5L532 385L528 377H523.5L532 400L535.5 390.5L544 402L537.5 416L533.5 419V442L537.5 434.5L544 436V450L548 457.5V466L553 475.5L551 487L548 499.5L555.5 503.5L561.5 514V528L548 538.5L544 552.5L535.5 556.5L513 562L506 574L490.5 586L488.5 595L480 598.5L477 590.5L459 592L451.5 604.5L444.5 626L442.5 629.5L446.5 646L461.5 631L457.5 649L464 657.5L480 660L488.5 654.5L493.5 653L501 660L506 657.5L511.5 663.5L515 657.5L520.5 660L517 663.5L519 671L524.5 673.5L520.5 680.5V695.5L526.5 698.5L534 700.5V695.5L540 689.5L545 685.5L556 689.5L567.5 673.5L574.5 660L576.5 656L583 663.5L590.5 660L596.5 653L603 654.5L606.5 649H613L618 642L626.5 637.5L631.5 651.5L630 657.5L631.5 675L639 702L646.5 710L655.5 702L653 697L655.5 695.5L661.5 698.5L667 688L665 680.5L670.5 675L665 663.5L668.5 654.5L659.5 643.5L649.5 632.5L646.5 637.5L639 643.5V639.5L635 634.5L639 629.5L646.5 626L651 602.5H646.5L642 600.5L646.5 592L642 589L639 571H643.5V562L651 556.5L649.5 543.5L654 530L653 520.5V514L649.5 508L651 503.5L649.5 497L656 490L653 482.5H663.5L667.5 478L661 474V467.5L656 462L665.5 453L663.5 448.5V421L674 419H679.5L686 421L699 413.5V390L704 383.5L721.5 376L727.5 379.5H737.5L740.5 383.5L745 390L754.5 386L761 392.5L752.5 398.5L751 407L757.5 417L761 428L768 437.5L781.5 448.5V455L790.5 459L798 457.5L801.5 459L796.5 470L801.5 508L800 522.5L801.5 532L807 529.5L816.5 497L820 495H829.5L837.5 502L841.5 498.5L848.5 500.5L857.5 513.5L870 525V534L884.5 543L881.5 529.5L884.5 527.5H889L895 522.5L904.5 519.5L914 525L919 519.5L917 510.5L921.5 506L935 519.5L945.5 522.5V517L951 513.5L957 499.5L962 498L964.5 495L967 486.5L965 473L963.5 461V449L969.5 442.5L980 452.5H989.5L1006.5 442.5L1016.5 437.5L1024.5 426.5L1027.5 414.5L1041 394.5L1055.5 347L1064 328L1058.5 318.5L1051 305L1058.5 289L1067 279.5L1077 269L1082 258L1085 228.5L1082 207L1085 189L1077 183H1061L1051 179.5L1041 176.5L1029 164L1021 168.5L1008 174H993.5L980 168.5L971 159.5L965 150L952.5 144.5L937 133.5H930L918 127V133.5L915 148.5L921.5 162L924.5 168.5H918L915 174H899.5L886.5 162L890 156.5L883 153.5L872.5 156.5L864.5 148.5V137L874.5 127V120.5L878 116L872.5 113L864.5 103L866.5 119L858 125.5L851 122L847 111.5L841.5 109L825 107.5L806 119L785 148.5L763.5 171.5L752 209.5L741.5 225.5L724 231L718.5 225.5L705 231V238L698.5 245.5L692.5 258L696.5 264V284H702.5L701 297L692.5 306.5L676.5 326L679.5 333L662 345H648.5L645 357.5H637L634.5 351.5L624 345V339.5L637 337.5L624 326V323L619.5 316.5L624 311.5L616 300.5L607 294V311.5L603 297L599 299.5L596.5 290.5L591.5 284L587.5 274L582 266.5L574 264L569.5 253.5L564 248V253.5L559 250.5L562.5 227H567V222.5L576 213L578.5 199.5L574 182L562.5 170L567 165L582 172.5L594 180.5L603 179.5L613.5 167.5L615 148.5H620.5L624 139.5L633.5 127L635.5 131.5L647.5 122L643.5 116L624 102.5L605.5 87L603 71.5L593 60L574 39.5L567 15.5L540.5 10.5L527 15.5L525 63.5M78.5 546L84.639 558H172.999V537H71.2852L77 539.5M54 495.5L61 500.5L55.5 507H50L61 519H64.5M54 495.5V485H46L36.5 487.5L33 485L24 487.5L30 492.5L22.5 495.5L19 490.5H14.5L7.5 478V473L12.5 471.5V461L7.5 457H2V446.5L12.5 444.5L7.5 435V427.5L12.5 423.5V406.5L7.5 399.5V381L12.5 373.5L7.5 366.5L12.5 343L16.5 337.5L12.5 331L25 311L23 299L34 287L43 276L40 268L38 255L43 238L48 235L55 220.5L58 205L70 192L77.5 189.5L99.5 171L107 169L122 155L120 144H123.5L127 135L134 127V109.5L139.5 103L152 94L157 81V69L165.5 63.5L181.5 60.5M54 495.5V492H159V520.5H66L64.5 519M64.5 519L67.5 522L61 525.5L69 536L77 539.5M181.5 60.5L198 63.5L209.5 60.5L223.5 66.5L245.5 94V98.5L249.5 100V107.5H252.5L255.5 105.5L259 109.5L262.5 103H265L262.5 94L272.5 88.5L278.5 91L298 77.5M181.5 60.5L173.822 61.9397L169 193L296.5 167L298.98 78.1238L298 77.5M298 77.5L303.5 81L308.5 77.5V73.5L323.5 70.5L345.5 52.5L366 54L375 49.5L378.5 54L386.5 47L401 42H417L442.5 28.5L462.5 49.5L484.5 71.5L492 89M492 89L499.5 96.5H507L503.5 89L525 63.5M492 89L488 79.6667V88.5L483 103.5V145H525.5V51.5L525 63.5M698 131.5L691.5 122.5V109.5H686.5V104L682 102L689 89.5V75.5L694 68L718.5 50.5M698 131.5L705 155L712.5 175L710.5 182.5L718.5 196.5L732.5 186M698 131.5L698.596 133.5H719.5V50M718.5 50.5L736.5 41.5M718.5 50.5L719.5 50M732.5 186L740 164.5V124.5L752.5 97L756.5 70.5L746.5 50.5L736.5 41.5M732.5 186L719.5 195.75V50M736.5 41.5L719.5 50M696.5 49.5H689L686 34L689 18L702 7L717.5 2.5L722.5 13V20L696.5 49.5Z"
              stroke="black"
              strokeWidth="1.5"
              className="pointer-events-none"
            />
          </svg>
        </motion.div>

        <motion.div
          key={selectedIsland} // Add key to force re-animation when island changes
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="lg:w-[384px] lg:shrink-0"
        >
          <MapInfoCard title={finalName} description={highlightWords(finalDesc, keywordsToBold)} />
        </motion.div>
      </div>
    </Container>
  );
}
