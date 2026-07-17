"use client";

import Image from "next/image";
import { Container } from "@/components/atoms/Container";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { TranslatableText } from "@/components/atoms/TranslatableText";

export function SponsorSection() {
  return (
    <Container as="section" className="py-16 md:py-20 flex flex-col items-center gap-10">
      <SectionHeader
        title={<TranslatableText dictKey="sponsor.title" idText="Dukungan & Kolaborasi" />}
        subtitle={<TranslatableText dictKey="sponsor.subtitle" idText="Institusi dan perusahaan yang telah mendukung kegiatan KKN PPM UGM di Banggai Kepulauan" />}
        align="center"
      />

      <div className="w-full max-w-6xl flex flex-col items-center gap-12 md:gap-16 pt-8">
        
        {/* Top Level Sponsor */}
        <div className="flex justify-center w-full">
          <Image
            src="/images/sponsor/Paragon.svg"
            alt="ParagonCorp"
            width={400}
            height={120}
            className="h-16 md:h-20 lg:h-24 w-auto object-contain"
          />
        </div>

        {/* Mid Level Sponsors */}
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 w-full">
          <Image
            src="/images/sponsor/jne.svg"
            alt="JNE Express"
            width={200}
            height={80}
            className="h-10 md:h-14 lg:h-16 w-auto object-contain"
          />
          <Image
            src="/images/sponsor/fifgroup.svg"
            alt="FIFGROUP"
            width={300}
            height={100}
            className="h-14 md:h-20 lg:h-24 w-auto object-contain"
          />
        </div>

        {/* Bottom Level Sponsors */}
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-10 w-full max-w-5xl">
          <Image src="/images/sponsor/taspen.svg" alt="Taspen" width={100} height={50} className="h-7 md:h-8 w-auto object-contain" />
          <Image src="/images/sponsor/gik-ugm.svg" alt="GIK UGM" width={100} height={50} className="h-7 md:h-8 w-auto object-contain" />
          <Image src="/images/sponsor/jasamarga.svg" alt="Jasa Marga" width={120} height={50} className="h-7 md:h-8 w-auto object-contain" />
          <Image src="/images/sponsor/pepsodent.svg" alt="Pepsodent" width={120} height={50} className="h-7 md:h-8 w-auto object-contain" />
          <Image src="/images/sponsor/rexona.svg" alt="Rexona" width={80} height={40} className="h-4 md:h-5 w-auto object-contain" />
          <Image src="/images/sponsor/tunas-honda.svg" alt="Tunas Honda" width={120} height={40} className="h-3 md:h-4 w-auto object-contain" />
          <Image src="/images/sponsor/blue-alliance.svg" alt="Blue Alliance" width={100} height={60} className="h-10 md:h-12 w-auto object-contain" />
          <Image src="/images/sponsor/bank-sulteng.svg" alt="Bank Sulteng" width={120} height={50} className="h-7 md:h-8 w-auto object-contain" />
          <Image src="/images/sponsor/wiar-sinergi-prima.svg" alt="Wiar Sinergi Prima" width={80} height={60} className="h-8 md:h-10 w-auto object-contain" />
          <Image src="/images/sponsor/tradco-synergi-indonesia.svg" alt="Tradco Synergi Indonesia" width={80} height={50} className="h-7 md:h-8 w-auto object-contain" />
          <Image src="/images/sponsor/pt-jip.svg" alt="PT JIP" width={80} height={50} className="h-7 md:h-8 w-auto object-contain" />
          <Image src="/images/sponsor/ss.svg" alt="SS" width={60} height={60} className="h-7 md:h-8 w-auto object-contain" />
        </div>

        {/* Media Partner */}
        <div className="flex flex-col items-center gap-6 mt-8 w-full">
          <p className="font-[family-name:var(--font-dm-sans)] text-[14px] md:text-[16px] font-bold text-[#4b5563] uppercase tracking-wider">
            <TranslatableText dictKey="sponsor.mediaPartner" idText="Media Partner" />
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            <Image
              src="/images/sponsor/krjogja.svg"
              alt="KR Jogja"
              width={200}
              height={80}
              className="h-8 md:h-10 w-auto object-contain"
            />
            <Image
              src="/images/sponsor/rri-yogyakarta.svg"
              alt="RRI Yogyakarta"
              width={200}
              height={80}
              className="h-10 md:h-12 w-auto object-contain"
            />
            <Image
              src="/images/sponsor/bangkep-news.png"
              alt="Bangkep News"
              width={200}
              height={80}
              className="h-10 md:h-12 w-auto object-contain"
            />
          </div>
        </div>

      </div>
    </Container>
  );
}
