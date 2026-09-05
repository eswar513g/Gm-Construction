/**
 * GM Constructions — Master Site Configuration
 * 
 * Edit this file to customize company phone numbers, email, address,
 * stats, and portfolio data without having to touch the HTML markup!
 */

const SITE_CONFIG = {
  // 1. Basic Company Information
  companyName: "GM Constructions",
  shortName: "GM",
  tagline: "Building Your Vision, Creating Your Future",
  subheading: "GM Constructions delivers quality construction solutions with professional workmanship, reliable service, and a commitment to excellence.",

  // 2. Verified Contact Details
  // Change these to your actual phone number, email, and address
  phoneDisplay: "+91 9493910136",
  phoneRaw: "+91 9441784245",
  secondaryPhone: "+91 9441784245",
  whatsappNumber: "91 9493910136", // Digits only with country code, no + or spaces
  whatsappPrefilledMessage: "Hello GM Constructions, I would like to inquire about a construction project and get a quote.",
  email: "contact@gpmallikarjuna1978@gmail.com",
  address: "NELLORE VEDAYAPALEM PIN : 524004",
  googleMapsUrl: "https://maps.google.com/?q=Construction+Plaza+Ring+Road",
  businessHours: "Monday – Saturday: 9:00 AM – 6:00 PM",
  sundayHours: "Sunday: Closed (Site Emergencies by Appointment)",

  // 3. Analytics and enquiry delivery
  // Replace these placeholders with your Google Analytics measurement ID and
  // Formspree form endpoint before publishing the site.
  analyticsMeasurementId: "",
  enquiryFormEndpoint: "",

  // 4. Social Media Links
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
  },

  // 4. Company Statistics (Animated Live Counters)
  statistics: [
    { label: "Years of Experience", value: 16, suffix: "+" },
    { label: "Completed Projects", value: 20, suffix: "+" },
    { label: "Satisfied Clients", value: 80, suffix: "+" },
    { label: "Engineers & Craftsmen", value: 60, suffix: "+" },
  ],

  // 5. Why Choose Us Highlights
  whyChooseUs: [
    {
      icon: "shield-check",
      title: "Quality Workmanship",
      description: "Rigorous quality control adhering to national building codes. Zero compromise on structural integrity and craft."
    },
    {
      icon: "users",
      title: "Experienced Team",
      description: "Licensed engineers, certified project supervisors, and master artisans with decades of on-site experience."
    },
    {
      icon: "calendar-clock",
      title: "On-Time Project Delivery",
      description: "We work with clear milestone schedules backed by modern project management to hand over your keys on time."
    },
    {
      icon: "cube",
      title: "Premium Grade Materials",
      description: "Direct sourcing from certified manufacturers for 53-grade cement, tested TMT steel, and weather-proof fittings."
    },
    {
      icon: "chart-line",
      title: "Reliable Project Management",
      description: "Transparent daily/weekly reporting, digital milestone tracking, and dedicated on-site project managers."
    },
    {
      icon: "heart-handshake",
      title: "100% Customer Satisfaction",
      description: "Complete cost transparency, no hidden contractor fees, and comprehensive structural warranties post-handover."
    }
  ],

  // 6. Core Services (8 Areas)
  services: [
    {
      id: "residential",
      icon: "home",
      title: "Residential Construction",
      tagline: "Villas, Duplexes & Apartments",
      description: "From custom luxury villas to modern independent homes and multi-family apartments, we build spaces customized to your family's lifestyle and architectural aspirations.",
      features: ["Custom Architectural Blueprinting", "Turnkey RCC & Brick Construction", "Vastu-Compliant Space Planning", "Premium Interior & Exterior Handover"],
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "commercial",
      icon: "building",
      title: "Commercial Construction",
      tagline: "Offices, Malls & Hubs",
      description: "Purpose-built commercial properties designed for high foot traffic, productivity, and modern safety codes. We engineer corporate complexes, showrooms, and retail towers.",
      features: ["Heavy Commercial Structural Framing", "Facade Glass & ACP Cladding", "Fire Safety & MEP Compliance", "Optimized Parking & Utility Layouts"],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "building",
      icon: "layers",
      title: "Building Construction",
      tagline: "Foundations & Structural Frames",
      description: "End-to-end multi-storey structural development. We handle deep piling, soil stabilization, RCC columns, beam frameworks, and slab casting with engineering perfection.",
      features: ["Soil Testing & Deep Foundation Piling", "Seismic-Resistant RCC Structures", "Grade-Tested Cement & Steel", "Multi-Tier Structural Auditing"],
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "finishing",
      icon: "brush",
      title: "Interior & Exterior Finishing",
      tagline: "Aesthetic Excellence & Coatings",
      description: "The finishing touches that define a luxury structure. We deliver precision Italian marble and vitrified tiling, custom false ceilings, texture paints, and weatherproof external paints.",
      features: ["Italian Marble & Granite Installation", "Designer Gypsum False Ceilings", "Weather-Shield Exterior Textures", "Custom Glass Railings & Partitions"],
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "maintenance",
      icon: "wrench",
      title: "Maintenance & Repair",
      tagline: "Structural Longevity & Care",
      description: "Keep your building in prime condition. We offer specialized polyurethane chemical waterproofing, seismic crack injections, dampness treatment, and preventative maintenance.",
      features: ["Roof & Basement Waterproofing", "Structural Epoxy Crack Injections", "Plumbing & Drainage Re-lining", "Annual Building Health Inspections"],
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "planning",
      icon: "compass",
      title: "Project Planning & Management",
      tagline: "Blueprints to Handover",
      description: "From concept to commissioning. Our seasoned planners assist with architectural CAD blueprints, realistic 3D exterior renders, municipal sanctioning, and strict cost controls.",
      features: ["2D Architectural & Structural Drawings", "Hyper-Realistic 3D Elevations", "Municipal Approval Facilitation", "Detailed Bill of Quantities (BOQ)"],
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
    }
  ],

  // 7. Projects & Portfolio Gallery
  projects: [
    {
      id: "gm-proj-1",
      title: "GM Grand Residency — Multi-Storey Apartments",
      category: "residential",
      categoryLabel: "Residential",
      location: "Vedayapalem, Nellore, AP",
      status: "Completed",
      area: "8,500 Sq. Ft.",
      timeline: "12 Months",
      image: "gm1.jpeg",
      description: "Completed modern G+3 residential building engineered with stilt car parking, seismic-resistant RCC structural column grid, high-durability weather-shield exterior plastering, and architectural blue UV-reflective glazing.",
      highlights: [
        "Stilt + 3 Floors RCC Framed Structure",
        "Dedicated Ground-Floor Covered Parking",
        "Architectural UV-Reflective Glazing",
        "100% Vastu-Compliant Multi-Family Layouts"
      ]
    },
    {
      id: "gm-proj-2",
      title: "Elite Multi-Storey Contemporary Apartments",
      category: "residential",
      categoryLabel: "Residential",
      location: "Nellore Central, AP",
      status: "Completed",
      area: "12,500 Sq. Ft.",
      timeline: "14 Months",
      image: "gm2.jpeg",
      description: "Turnkey multi-storey luxury residential elevation featuring natural textured stone cladding, full-height vertical staircase curtain glazing, warm wooden feature wall panels, and sleek toughened glass balconies.",
      highlights: [
        "Full-Height Vertical Glazing Light-Well",
        "Natural Stone Cladding Accent Wall",
        "Toughened Safety Glass Balustrades",
        "Premium Wood-Textured Exterior Paneling"
      ]
    },
    {
      id: "gm-proj-3",
      title: "Design Elements Studio & Commercial Suites",
      category: "commercial",
      categoryLabel: "Commercial",
      location: "Commercial Corridor, Nellore, AP",
      status: "Completed",
      area: "7,200 Sq. Ft.",
      timeline: "10 Months",
      image: "gm3.jpeg",
      description: "Sophisticated multi-tier commercial studio and modern retail complex featuring minimalist white stucco finish, signature circular architectural cutouts, vertical sunscreen louvers, and integrated balcony planters.",
      highlights: [
        "Architectural Circular Statement Openings",
        "Vertical Louvered Sunscreen Fins",
        "Commercial Grade Glass Railings & Entry",
        "Integrated Vertical Greenery & Planters"
      ]
    },
    {
      id: "gm-proj-4",
      title: "Modern Horizon Luxury Duplex Villa",
      category: "residential",
      categoryLabel: "Residential",
      location: "South Bypass Avenue, Nellore, AP",
      status: "Completed",
      area: "4,500 Sq. Ft.",
      timeline: "9 Months",
      image: "gm4.jpeg",
      description: "Contemporary two-storey luxury duplex villa design engineered with cantilevered horizontal concrete slabs, rich exterior teak wood cladding, expansive panoramic windows, and designer perimeter compound landscaping.",
      highlights: [
        "Cantilevered Modern Architectural Elevation",
        "Rich Exterior Wood & Stone Wall Facades",
        "Expansive Glass Windows for Natural Light",
        "Secure Gated Compound Wall & Landscaping"
      ]
    },
    {
      id: "proj-1",
      title: "Grand Crest Luxury Villas",
      category: "residential",
      categoryLabel: "Residential",
      location: "Green Valley Estates, Sector 4",
      status: "Completed",
      area: "14,500 Sq. Ft.",
      timeline: "14 Months",
      image: "gm5.jpeg",
      description: "A series of three contemporary 4-BHK duplex villas with double-height living spaces, infinity edge pools, landscaped private courtyards, and integrated solar roofing.",
      highlights: ["Earthquake-resistant RCC framing", "Imported Italian marble flooring", "Solar rooftop integration", "Smart home automation"]
    },
    {
      id: "proj-2",
      title: "Apex Corporate Hub & Commercial Tower",
      category: "commercial",
      categoryLabel: "Commercial",
      location: "Outer Ring Road, Tech Corridor",
      status: "Completed",
      area: "36,000 Sq. Ft.",
      timeline: "18 Months",
      image: "gm6.jpeg",
      description: "G+5 storey corporate headquarters featuring open-span columnless office floors, acoustic double-glazed glass facade, high-speed elevator shafts, and basement parking.",
      highlights: ["Curtain wall structural glazing", "Post-tensioned concrete slabs", "LEED-aligned energy efficiency", "Central HVAC structural ducts"]
    },
    {
      id: "proj-3",
      title: "Skyline Family Residence",
      category: "residential",
      categoryLabel: "Residential",
      location: "Lakshmi Nagar, Nellore, AP",
      status: "Completed",
      area: "6,200 Sq. Ft.",
      timeline: "11 Months",
      image: "gm7.jpeg",
      description: "A bright contemporary family residence with spacious balconies, durable exterior finishes, and a practical multi-level layout designed for everyday comfort.",
      highlights: ["Multi-Level Family Planning", "Natural Cross Ventilation", "Covered Vehicle Parking", "Low-Maintenance Exterior"]
    },
    {
      id: "proj-4",
      title: "Garden View Premium Villa",
      category: "residential",
      categoryLabel: "Residential",
      location: "Magunta Layout, Nellore, AP",
      status: "Completed",
      area: "5,800 Sq. Ft.",
      timeline: "10 Months",
      image: "gm8.jpeg",
      description: "A refined urban villa combining clean modern lines, generous glazing, landscaped edges, and a secure frontage for comfortable city living.",
      highlights: ["Modern Villa Elevation", "Energy-Efficient Glazing", "Landscape-Ready Frontage", "Secure Gated Entry"]
    },
  ],

  // 8. Modern Machinery & Fleet
  machinery: [
    { name: "Heavy Hydraulic Excavators", count: "4 Units", desc: "For rapid, precise site earthworks and foundation digging." },
    { name: "Concrete Transit Mixers & Pumps", count: "6 Units", desc: "Ensures uniform grade concrete delivery and high-rise pumping." },
    { name: "Tower Cranes & Material Hoists", count: "3 Units", desc: "Safe vertical logistics for multi-storey concrete, rebar, and brickwork." },
    { name: "Heavy Compactor Rollers", count: "2 Units", desc: "High-density soil and subgrade road compaction." },
    { name: "Systematic Steel Scaffolding", count: "50,000+ Sq Ft", desc: "Standardized tubular scaffolding for total on-site worker safety." }
  ],

  // 9. Client Testimonials
  testimonials: [
    {
      name: "Mr. Rajesh Sharma",
      role: "Homeowner",
      project: "Grand Crest Luxury Villa",
      rating: 5,
      comment: "Excellent workmanship and professional service. The GM Constructions team handled our villa project with great attention to detail, maintaining strict timelines and transparent material bills without any unexpected cost jumps.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Mr. Arun Patel",
      role: "Managing Director",
      project: "Apex Commercial Hub",
      rating: 5,
      comment: "From initial soil testing and municipal approvals to the final glass facade finish, GM Constructions demonstrated top-tier engineering discipline and project management. Delivered ahead of our business launch date.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Er. Vikram Nair",
      role: "Consulting Architect",
      project: "Skyline Residences",
      rating: 5,
      comment: "As an architect, it is rare to find contractors who respect blueprint tolerances so meticulously. GM Constructions executes structural drawings faithfully with exceptional concrete finish quality.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
    }
  ],

  // 10. Frequently Asked Questions
  faqs: [
    {
      q: "How does GM Constructions handle government approvals and building permits?",
      a: "Our dedicated project planning team assists you from day one. We prepare compliant architectural drawings, structural stability certificates, and liaison with local municipal corporations and development authorities for seamless sanction approvals."
    },
    {
      q: "What is your typical payment schedule during construction?",
      a: "We operate on a transparent milestone-based payment schedule. You only pay after verified completion of specific stages (e.g. Foundation stage, Plinth level, RCC Slab casting, Brickwork/Plaster, Finishing, and Final Handover). There are never surprises."
    },
    {
      q: "What warranties do you provide on completed buildings?",
      a: "We provide a 10-year structural warranty against foundation or RCC framing defects, along with a 5-year warranty on specialized waterproofing treatments and a 1-year complimentary post-handover defect liability maintenance check."
    },
    {
      q: "Can you construct if we already have our own architectural drawings?",
      a: "Yes! We frequently collaborate with independent architects and structural engineers. We review your existing drawings, provide an itemized Bill of Quantities (BOQ), and execute the project with precision."
    },
    {
      q: "How can I monitor progress if I am living in another city or abroad?",
      a: "We assign you a dedicated Site Project Engineer who shares scheduled weekly video and photo walkthroughs, drone updates, and digital progress reports so you always have full visibility regardless of where you are located."
    }
  ],

  // 11. Interactive Cost Estimator Base Rates (Per Sq. Ft.)
  calculatorRates: {
    residential: {
      standard: 1850,
      premium: 2450,
      luxury: 3250
    },
    commercial: {
      standard: 2100,
      premium: 2800,
      luxury: 3800
    },
  }
};

// Export to window object for browser access
window.SITE_CONFIG = SITE_CONFIG;
