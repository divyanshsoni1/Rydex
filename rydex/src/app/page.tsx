import { auth } from "@/auth";
import AdminDashboard from "@/components/AdminDashboard";
import Footer from "@/components/Footer";
import GeoUpdater from "@/components/GeoUpdater";
import Nav from "@/components/Nav";
import PartnerDashboard from "@/components/PartnerDashboard";
import PublicHome from "@/components/PublicHome";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export default async function Home() {
  let session = await auth();
  await connectDB();
  const user = await User.findOne({ email: session?.user?.email });
  const plainUser = JSON.parse(JSON.stringify(user));

  let content;

  if (plainUser?.role === "partner") {
    content = (
      <>
        <Nav />
        <PartnerDashboard />
      </>
    );
  } else if (plainUser?.role === "admin") {
    content = <AdminDashboard />;
  } else {
    content = (
      <>
        <Nav />
        <PublicHome />
      </>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white">
      {plainUser?.role === "partner" && (
        <GeoUpdater userId={plainUser._id.toString()} />
      )}
      {content}
      <Footer />
    </div>
  );
}
