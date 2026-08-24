"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Search, MapPin, Phone, Hospital, HeartPulse, ChevronDown } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { useLanguage } from "@/context/LanguageContext";

type HealthFacility = {
  category: string;
  name: string;
  kecamatan: string;
  type: string;
  layanan: string;
  address: string;
  mapLink: string;
  image?: string | null;
  contact: string;
};

const healthFacilities: HealthFacility[] = [
  {
    "category": "Rumah Sakit",
    "name": "RSUD Trikora Salakan",
    "kecamatan": "Tinangkung",
    "type": "Rumah Sakit Umum Daerah (Kelas C)",
    "layanan": "Rujukan utama",
    "address": "Tompudau, Tinangkung, Kabupaten Banggai Kepulauan, Sulawesi Tengah",
    "mapLink": "https://maps.app.goo.gl/mVWmx3xj3hChmKsy7?g_st=ic",
    "image": null,
    "contact": "-"
  },
  {
    "category": "Rumah Sakit",
    "name": "RS. Pratama Bilabanggai (Lumbi-Lumbia)",
    "kecamatan": "Buko Selatan",
    "type": "RS Kelas D Pratama",
    "layanan": "-",
    "address": "Lumbi-Lumbia, Kec. Buko Selatan, Kabupaten Banggai Kepulauan, Sulawesi Tengah 94881",
    "mapLink": "https://maps.app.goo.gl/C4Gn98r1DLTkpqcg8?g_st=ic",
    "image": null,
    "contact": "-"
  },
  {
    "category": "Puskesmas",
    "name": "Puskesmas Totikum",
    "kecamatan": "Totikum",
    "type": "Perawatan (Rawat Inap)",
    "layanan": "-",
    "address": "Sakay, Kec. Totikum, Kabupaten Banggai Kepulauan, Sulawesi Tengah",
    "mapLink": "https://maps.app.goo.gl/fUoeda7aXCpCkwxf8?g_st=ic",
    "contact": "-"
  },
  {
    "category": "Puskesmas",
    "name": "Puskesmas Totikum Selatan",
    "kecamatan": "Totikum Selatan",
    "type": "Non Perawatan",
    "layanan": "-",
    "address": "Kanali, Kec. Totikum Sel., Kabupaten Banggai Kepulauan, Sulawesi Tengah 94884",
    "mapLink": "https://maps.app.goo.gl/ovcpkNPSappCMZ4E7?g_st=ic",
    "contact": "-"
  },
  {
    "category": "Puskesmas",
    "name": "Puskesmas Salakan",
    "kecamatan": "Tinangkung",
    "type": "Perawatan (Rawat Inap)",
    "layanan": "-",
    "address": "Jalan Bhangkara, Baka, Tinangkung, Kabupaten Banggai Kepulauan, Sulawesi Tengah 94885",
    "mapLink": "https://maps.app.goo.gl/LhJctdNpMbmbc5Kp7?g_st=ic",
    "contact": "-"
  },
  {
    "category": "Puskesmas",
    "name": "Puskesmas Bakalan Raya",
    "kecamatan": "Tinangkung",
    "type": "Non Perawatan",
    "layanan": "-",
    "address": "Bakalan, Tinangkung, Kabupaten Banggai Kepulauan, Sulawesi Tengah",
    "mapLink": "https://maps.app.goo.gl/wkcFPNgchqHHf7Sw5?g_st=ic",
    "contact": "-"
  },
  {
    "category": "Puskesmas",
    "name": "Puskesmas Mansamat",
    "kecamatan": "Tinangkung Selatan",
    "type": "Non Perawatan",
    "layanan": "-",
    "address": "Jl. Trans Peling, Mansamat B, Kec. Tinangkung Sel., Kabupaten Banggai Kepulauan, Sulawesi Tengah 94885",
    "mapLink": "https://maps.app.goo.gl/vAUnVnwqw7xfm8Hn9?g_st=ic",
    "contact": "-"
  },
  {
    "category": "Puskesmas",
    "name": "Puskesmas Tinangkung Utara",
    "kecamatan": "Tinangkung Utara",
    "type": "Non Perawatan",
    "layanan": "-",
    "address": "Jl. Mamalasan, Luk Sagu, Kec. Tinangkung Utara, Kabupaten Banggai Kepulauan, Sulawesi Tengah 94885",
    "mapLink": "https://maps.app.goo.gl/j38kEiBHXnDeEbt58?g_st=ic",
    "contact": "-"
  },
  {
    "category": "Puskesmas",
    "name": "Puskesmas Liang",
    "kecamatan": "Liang",
    "type": "Non Perawatan",
    "layanan": "-",
    "address": "Liang, Kec. Liang, Kabupaten Banggai Kepulauan, Sulawesi Tengah 94883",
    "mapLink": "https://maps.app.goo.gl/cvM3Ujqj4A84oRd97?g_st=ic",
    "contact": "-"
  },
  {
    "category": "Puskesmas",
    "name": "Puskesmas Patukuki",
    "kecamatan": "Peling Tengah",
    "type": "Non Perawatan",
    "layanan": "-",
    "address": "Patukuki, Kec. Peling Tengah, Kabupaten Banggai Kepulauan, Sulawesi Tengah 94883",
    "mapLink": "https://maps.app.goo.gl/PwF3M28pR9GR5eQ99?g_st=ic",
    "contact": "-"
  },
  {
    "category": "Puskesmas",
    "name": "Puskesmas Bulagi",
    "kecamatan": "Bulagi",
    "type": "Non Perawatan",
    "layanan": "Perawatan (Rawat Inap)",
    "address": "Bulagi Satu, Bulagi, Kabupaten Banggai Kepulauan, Sulawesi Tengah 94882",
    "mapLink": "https://maps.app.goo.gl/eXr49gpy67DNrjoE7?g_st=ic",
    "contact": "-"
  },
  {
    "category": "Puskesmas",
    "name": "Puskesmas Lolantang",
    "kecamatan": "Bulagi Selatan",
    "type": "Non Perawatan",
    "layanan": "-",
    "address": "Lolantang, Kec. Bulagi Sel., Kabupaten Banggai Kepulauan, Sulawesi Tengah 94882",
    "mapLink": "https://maps.app.goo.gl/46PE4rmp3iPp9gak7?g_st=ic",
    "contact": "-"
  },
  {
    "category": "Puskesmas",
    "name": "Puskesmas Bonepuso",
    "kecamatan": "Bulagi Selatan",
    "type": "Non Perawatan",
    "layanan": "-",
    "address": "Bone Puso, Kec. Bulagi Sel., Kabupaten Banggai Kepulauan, Sulawesi Tengah 94881",
    "mapLink": "https://maps.app.goo.gl/UrfA9zReJCSi1to8A?g_st=ic",
    "contact": "-"
  },
  {
    "category": "Puskesmas",
    "name": "Puskesmas Sabang",
    "kecamatan": "Bulagi Utara",
    "type": "Perawatan",
    "layanan": "-",
    "address": "Sabang, Kec. Bulagi Utara, Kabupaten Banggai Kepulauan, Sulawesi Tengah",
    "mapLink": "https://maps.app.goo.gl/q3FZGsiDzFMdH3AN9?g_st=ic",
    "contact": "+62 852-4149-7882"
  },
  {
    "category": "Puskesmas",
    "name": "Puskesmas Tataba",
    "kecamatan": "Buko",
    "type": "Perawatan (Rawat Inap)",
    "layanan": "-",
    "address": "Labasiano, Kec. Buko, Kabupaten Banggai Kepulauan, Sulawesi Tengah 94881",
    "mapLink": "https://maps.app.goo.gl/vexmn86ibKzh6z4P8?g_st=ic",
    "contact": "-"
  },
  {
    "category": "Puskesmas",
    "name": "Puskesmas Lumbi-Lumbia",
    "kecamatan": "Buko Selatan",
    "type": "-",
    "layanan": "-",
    "address": "Lumbi-Lumbia, Kec. Buko Selatan, Kabupaten Banggai Kepulauan, Sulawesi Tengah 94881",
    "mapLink": "https://maps.app.goo.gl/cY78mybRNRE3Mquz6?g_st=ic",
    "contact": "-"
  }
];

export function HealthFacilities() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKecamatan, setSelectedKecamatan] = useState("Semua Kecamatan");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const kecamatans = useMemo(() => {
    const list = Array.from(new Set(healthFacilities.map((item) => item.kecamatan)));
    return ["Semua Kecamatan", ...list.sort()];
  }, []);

  const filteredFacilities = useMemo(() => {
    return healthFacilities.filter((facility) => {
      const matchesSearch = facility.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesKecamatan = selectedKecamatan === "Semua Kecamatan" || facility.kecamatan === selectedKecamatan;
      const matchesCategory = selectedCategory === "Semua" || facility.category === selectedCategory;
      
      return matchesSearch && matchesKecamatan && matchesCategory;
    });
  }, [searchQuery, selectedKecamatan, selectedCategory]);

  const categories = [
    { id: "Semua", label: isEn ? "All" : "Semua" },
    { id: "Rumah Sakit", label: isEn ? "Hospital" : "Rumah Sakit" },
    { id: "Puskesmas", label: isEn ? "Health Center" : "Puskesmas" }
  ];

  return (
    <Container as="section" className="py-12 md:py-16">
      {/* Header */}
      <div className="mb-8 w-full">
        <h2 className="font-[family-name:var(--font-dm-sans)] text-2xl font-bold leading-tight text-[#0a0a0a] md:text-[30px] md:leading-[36px] mb-4">
          {isEn ? "Banggai Kepulauan Healthcare Facilities" : "Fasilitas Kesehatan Banggai Kepulauan"}
        </h2>
        <p className="font-[family-name:var(--font-dm-sans)] text-base leading-7 text-[#0a0a0a] md:text-lg md:leading-[28px] mb-6 text-justify">
          {isEn 
            ? "This guide is compiled to help the community and tourists easily find healthcare facilities (hospitals and community health centers) available in Banggai Kepulauan Regency." 
            : "Panduan ini disusun untuk memudahkan masyarakat dan wisatawan menemukan fasilitas kesehatan (rumah sakit dan puskesmas) yang tersedia di Kabupaten Banggai Kepulauan."}
        </p>
        <div className="inline-flex bg-gray-50 border border-gray-200 text-gray-700 rounded-xl p-3 text-sm md:text-base font-medium shadow-sm w-full md:w-auto">
          <span className="mr-2">📌</span>
          <span className="text-left font-[family-name:var(--font-inter)]">
            <strong>{isEn ? "Note:" : "Catatan:"}</strong> {isEn 
              ? "Data on this page is subject to change. Please confirm directly with the related facilities for the latest information on operating hours and services." 
              : "Data pada halaman ini dapat berubah sewaktu-waktu. Mohon konfirmasi langsung ke fasilitas terkait untuk informasi jam operasional dan layanan terbaru."}
          </span>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="mb-8 bg-red-50 border border-red-100 rounded-[16px] p-4 md:p-5 flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 md:gap-6 text-center md:text-left text-red-900 shadow-sm">
        <div className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] font-bold text-lg md:text-xl">
          <span className="text-2xl">🚨</span>
          <span>{isEn ? "Emergency?" : "Gawat darurat?"}</span>
        </div>
        <div className="hidden md:block w-px h-8 bg-red-200"></div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm md:text-base font-[family-name:var(--font-inter)]">
          <div>
            <span className="opacity-80">{isEn ? "Main referral:" : "Rujukan utama:"}</span> <span className="font-bold">RSUD Trikora Salakan</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-red-200 self-center"></div>
          <div>
            <span className="opacity-80">BPJS Care Center:</span> <span className="font-bold">165</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={isEn ? "Search facility name..." : "Cari nama fasilitas..."}
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3a4454] focus:border-[#3a4454] sm:text-sm transition-shadow text-[#0a0a0a]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Kecamatan Filter */}
        <div className="relative min-w-[240px]">
          <select
            className="block w-full appearance-none bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a4454] focus:border-[#3a4454] sm:text-sm cursor-pointer"
            value={selectedKecamatan}
            onChange={(e) => setSelectedKecamatan(e.target.value)}
          >
            {kecamatans.map((kec) => (
              <option key={kec} value={kec}>
                {kec}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-xl overflow-x-auto min-w-max">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredFacilities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFacilities.map((facility, index) => (
            <div key={index} className="bg-white rounded-[16px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
              {facility.image ? (
                <div className="relative w-full h-48 bg-gray-100">
                  <Image
                    src={`/images/dwb/${facility.image}`}
                    alt={facility.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="relative w-full h-48 bg-gray-50 flex items-center justify-center border-b border-gray-100">
                  <Hospital className="w-12 h-12 text-gray-300" />
                </div>
              )}
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    facility.category === "Rumah Sakit" 
                      ? "bg-red-50 text-red-700 border border-red-100" 
                      : "bg-green-50 text-green-700 border border-green-100"
                  }`}>
                    {facility.category === "Rumah Sakit" ? <Hospital className="w-3 h-3 mr-1" /> : <HeartPulse className="w-3 h-3 mr-1" />}
                    {facility.category}
                  </span>
                  {facility.type && facility.type !== "-" && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]">
                      {facility.type}
                    </span>
                  )}
                </div>
                
                <h3 className="font-[family-name:var(--font-dm-sans)] text-[18px] font-bold text-[#0a0a0a] mb-1 leading-tight">
                  {facility.name}
                </h3>
                <p className="text-sm font-medium text-gray-500 mb-4">
                  {isEn ? `District: ${facility.kecamatan}` : `Kecamatan ${facility.kecamatan}`}
                </p>

                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-[14px] text-gray-600 font-[family-name:var(--font-inter)] leading-relaxed">
                      {facility.address}
                    </p>
                  </div>
                  {facility.contact && facility.contact !== "-" && (
                    <div className="flex items-start">
                      <Phone className="w-4 h-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-[14px] text-gray-600 font-[family-name:var(--font-inter)]">
                        {facility.contact}
                      </p>
                    </div>
                  )}
                </div>

                <a
                  href={facility.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center w-full px-4 py-3 bg-[#3a4454] hover:bg-[#2d3542] text-white text-sm font-bold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3a4454]"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {isEn ? "Open in Google Maps" : "Buka di Google Maps"}
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
          <Hospital className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <h3 className="text-lg font-medium text-gray-900">{isEn ? "Facility not found" : "Fasilitas tidak ditemukan"}</h3>
          <p className="mt-1 text-sm text-gray-500">
            {isEn ? "Try adjusting your search keywords or filters." : "Coba sesuaikan kata kunci pencarian atau filter Anda."}
          </p>
        </div>
      )}

      {/* Keterangan */}
      <div className="mt-10 bg-gray-50 border border-gray-200 rounded-[16px] p-6 text-sm md:text-base text-gray-700 font-[family-name:var(--font-inter)] shadow-sm">
        <h3 className="font-[family-name:var(--font-dm-sans)] font-bold text-gray-900 mb-3 text-lg">{isEn ? "Legend:" : "Keterangan:"}</h3>
        <ul className="space-y-2 list-disc pl-5">
          <li>
            <strong className="text-gray-900">{isEn ? "Inpatient" : "Rawat Inap"}</strong> &mdash; {isEn ? "Community health center provides beds for patients requiring observation/recovery." : "Puskesmas menyediakan tempat tidur untuk pasien yang perlu observasi/pemulihan."}
          </li>
          <li>
            <strong className="text-gray-900">{isEn ? "Outpatient" : "Non Rawat Inap"}</strong> &mdash; {isEn ? "Only outpatient services (examination, treatment, same-day discharge)." : "Hanya layanan rawat jalan (periksa, obati, pulang hari itu juga)."}
          </li>
        </ul>
      </div>
    </Container>
  );
}
