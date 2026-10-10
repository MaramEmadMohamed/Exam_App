import { GraduationCap } from "lucide-react";
import HeaderHero from "@/shared/components/header/header-hero";
import DiplomaList from "../../components/diploma-list";

export default function DiplomaPage() {
  return (
    <>
      <HeaderHero icon={GraduationCap}>Diplomas</HeaderHero>
      <DiplomaList />
    </>
  );
}
