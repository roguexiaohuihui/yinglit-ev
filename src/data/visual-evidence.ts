export type VisualEvidenceItem = {
  id: string;
  section: "about" | "certifications";
  order: number;
  src: string;
  title: {
    en: string;
    zh: string;
  };
  alt: {
    en: string;
    zh: string;
  };
};

export const CERTIFICATION_EVIDENCE: VisualEvidenceItem[] = [
  {
    id: "eu-type-examination",
    section: "certifications",
    order: 1,
    src: "/images/certs/evidence/eu-type-examination.jpg",
    title: {
      en: "EU Type Examination",
      zh: "欧盟型式认证",
    },
    alt: {
      en: "EU type examination certificate for EV charging equipment",
      zh: "电动汽车充电设备欧盟型式认证证书",
    },
  },
  {
    id: "eu-type-matrix",
    section: "certifications",
    order: 2,
    src: "/images/certs/evidence/eu-type-matrix.jpg",
    title: {
      en: "Model Compliance Matrix",
      zh: "型号合规矩阵",
    },
    alt: {
      en: "Model matrix page from EU type examination documentation",
      zh: "欧盟型式认证文件中的型号合规矩阵页",
    },
  },
  {
    id: "low-voltage-a",
    section: "certifications",
    order: 3,
    src: "/images/certs/evidence/low-voltage-certificate.jpg",
    title: {
      en: "Low-Voltage Certificate",
      zh: "低压合规证书",
    },
    alt: {
      en: "Low-voltage compliance certificate for EV charging products",
      zh: "电动汽车充电产品低压合规证书",
    },
  },
  {
    id: "high-tech-enterprise",
    section: "certifications",
    order: 4,
    src: "/images/certs/evidence/high-tech-enterprise.jpg",
    title: {
      en: "High-Tech Enterprise",
      zh: "高新技术企业",
    },
    alt: {
      en: "National high-tech enterprise certificate",
      zh: "国家高新技术企业证书",
    },
  },
  {
    id: "ce-attestation-a",
    section: "certifications",
    order: 5,
    src: "/images/certs/evidence/ce-attestation-a.jpg",
    title: {
      en: "CE Attestation A",
      zh: "CE 符合性证明 A",
    },
    alt: {
      en: "CE attestation of conformity for charger models",
      zh: "充电设备型号的 CE 符合性证明",
    },
  },
  {
    id: "ce-attestation-b",
    section: "certifications",
    order: 6,
    src: "/images/certs/evidence/ce-attestation-b.jpg",
    title: {
      en: "CE Attestation B",
      zh: "CE 符合性证明 B",
    },
    alt: {
      en: "Secondary CE declaration page for charger model coverage",
      zh: "覆盖更多型号的第二份 CE 证明页",
    },
  },
  {
    id: "low-voltage-b",
    section: "certifications",
    order: 7,
    src: "/images/certs/evidence/low-voltage-certificate-b.jpg",
    title: {
      en: "LVD Certificate B",
      zh: "低压证书 B",
    },
    alt: {
      en: "Secondary low-voltage directive certificate",
      zh: "第二份低压指令合规证书",
    },
  },
  {
    id: "utility-patent",
    section: "certifications",
    order: 8,
    src: "/images/certs/evidence/utility-patent.jpg",
    title: {
      en: "Utility Patent",
      zh: "实用新型专利",
    },
    alt: {
      en: "Utility model patent certificate",
      zh: "实用新型专利证书",
    },
  },
];

export const ABOUT_EVIDENCE: VisualEvidenceItem[] = [
  {
    id: "assembly-line",
    section: "about",
    order: 1,
    src: "/images/about/evidence/assembly-line.jpg",
    title: {
      en: "Assembly Line",
      zh: "自动化装配线",
    },
    alt: {
      en: "Automated assembly line inside Yinglit production facility",
      zh: "盈利科技生产设施内的自动化装配线",
    },
  },
  {
    id: "electronics-assembly",
    section: "about",
    order: 2,
    src: "/images/about/evidence/electronics-assembly.jpg",
    title: {
      en: "Electronics Assembly",
      zh: "电子装配工位",
    },
    alt: {
      en: "Electronics assembly station with technicians",
      zh: "由技术人员操作的电子装配工位",
    },
  },
  {
    id: "testing-workstation",
    section: "about",
    order: 3,
    src: "/images/about/evidence/testing-workstation.jpg",
    title: {
      en: "Testing Workstation",
      zh: "测试工位",
    },
    alt: {
      en: "Testing workstation for charger components and assemblies",
      zh: "用于充电设备组件和整机的测试工位",
    },
  },
  {
    id: "production-floor",
    section: "about",
    order: 4,
    src: "/images/about/evidence/production-floor.jpg",
    title: {
      en: "Production Floor",
      zh: "生产车间",
    },
    alt: {
      en: "Production floor inspection area in Yinglit factory",
      zh: "盈利工厂内的生产车间巡检区域",
    },
  },
  {
    id: "high-power-cabinets",
    section: "about",
    order: 5,
    src: "/images/about/evidence/high-power-cabinets.jpg",
    title: {
      en: "Power Cabinet Area",
      zh: "功率柜测试区",
    },
    alt: {
      en: "High-power charging cabinet test area",
      zh: "高功率充电柜测试区域",
    },
  },
  {
    id: "charger-line",
    section: "about",
    order: 6,
    src: "/images/about/evidence/charger-line.jpg",
    title: {
      en: "Charger Output Line",
      zh: "充电桩产线",
    },
    alt: {
      en: "Finished charger line ready for final inspection",
      zh: "待最终检验的充电桩产线",
    },
  },
];
