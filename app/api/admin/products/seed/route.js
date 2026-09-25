import { NextResponse } from "next/server";
import connectToDatabase from "../../../../../lib/mongodb";
import Product from "../../../../../models/Product";
import { requireAdmin } from "../../../../../lib/admin";

const DEFAULTS = [
  { name:"SQLwhale", category:"learning", description:"Master data skills through hands-on SQL practice.", status:"Explore", href:"https://sqlwhalefrontend.vercel.app/", accent:"blue", icon:"database", tags:["SQL","Database","Learning"], sortOrder:1 },
  { name:"Programming", category:"learning", description:"A practical programming learning path is being crafted.", status:"Coming soon", accent:"violet", icon:"spark", tags:["Programming","Learning"], sortOrder:2 },
  { name:"Data Structures", category:"learning", description:"Build stronger foundations, one pattern at a time.", status:"Coming soon", accent:"coral", icon:"spark", tags:["DSA","Learning"], sortOrder:3 },
  { name:"Resume Analyzer", category:"product", description:"Turn your resume into a clearer next opportunity.", status:"Try it", href:"https://t.me/ScanMyResumeBot", accent:"orange", icon:"resume", tags:["Career","Resume","AI"], sortOrder:4 },
  { name:"AI 8D Audio Converter", category:"product", description:"Bring more clarity and presence to every track.", status:"Try it", href:"https://project911-flame.vercel.app/", accent:"pink", icon:"music", tags:["Audio","Music","AI"], sortOrder:5 },
  { name:"Webchat", category:"product", description:"A lightweight web chat experience for connecting and communicating online.", status:"Try it", href:"https://webwhalechat.netlify.app/", accent:"mint", icon:"spark", tags:["Chat","Communication"], sortOrder:6 },
  { name:"Web Development", category:"service", description:"Thoughtful web experiences that grow with you.", status:"Work with us", accent:"mint", icon:"spark", tags:["Web","Development"], sortOrder:7 },
  { name:"Marketing", category:"service", description:"Make the right people notice what you are building.", status:"Coming soon", accent:"yellow", icon:"spark", tags:["Marketing"], sortOrder:8 },
  { name:"Consulting", category:"service", description:"Practical clarity for your most important decisions.", status:"Coming soon", accent:"violet", icon:"spark", tags:["Consulting"], sortOrder:9 },
];

export async function POST(request) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;
  try {
    await connectToDatabase();
    const count = await Product.countDocuments({});
    if (count > 0) return NextResponse.json({ seeded: false });
    await Product.insertMany(DEFAULTS.map((item) => ({ ...item, showOnHome: true, showOnProducts: item.category !== "service" })));
    return NextResponse.json({ seeded: true });
  } catch (error) {
    console.error("Product seed error:", error);
    return NextResponse.json({ message: "Unable to initialize products." }, { status: 500 });
  }
}
