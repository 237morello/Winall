/**
 * Logos de marques reconnaissables parmi les `tools` de chaque service.
 * Chaque entrée `tools` déclarée dans `marketing.constants.ts` correspond à
 * une vraie marque ; un item sans correspondance ici reste affiché en texte
 * brut dans `ServiceTools` (filet de sécurité, ne devrait plus arriver).
 */
const TOOL_LOGO_MATCHERS: Array<{ pattern: RegExp; logo: string; label: string }> = [
  { pattern: /adobe photoshop/i, logo: "/images/tools/adobephotoshop.svg", label: "Adobe Photoshop" },
  { pattern: /adobe illustrator/i, logo: "/images/tools/adobeillustrator.svg", label: "Adobe Illustrator" },
  { pattern: /adobe indesign/i, logo: "/images/tools/adobeindesign.svg", label: "Adobe InDesign" },
  { pattern: /figma/i, logo: "/images/tools/figma.svg", label: "Figma" },
  { pattern: /coreldraw/i, logo: "/images/tools/coreldraw.svg", label: "CorelDRAW" },
  { pattern: /canva/i, logo: "/images/tools/canva.svg", label: "Canva" },
  { pattern: /autocad/i, logo: "/images/tools/autocad.svg", label: "AutoCAD" },

  // Doit précéder le matcher "Autodesk" générique (substring commun).
  { pattern: /autodesk revit/i, logo: "/images/tools/autodeskrevit.svg", label: "Autodesk Revit" },
  { pattern: /^autodesk$/i, logo: "/images/tools/autocad.svg", label: "Autodesk" },

  { pattern: /fluke/i, logo: "/images/tools/fluke.svg", label: "Fluke" },
  { pattern: /weller/i, logo: "/images/tools/weller.svg", label: "Weller" },
  { pattern: /chauvin arnoux/i, logo: "/images/tools/chauvinarnoux.png", label: "Chauvin Arnoux" },
  { pattern: /flir/i, logo: "/images/tools/flir.svg", label: "FLIR" },
  { pattern: /facom/i, logo: "/images/tools/facom.svg", label: "Facom" },
  { pattern: /keysight/i, logo: "/images/tools/keysight.svg", label: "Keysight" },
  { pattern: /leica geosystems/i, logo: "/images/tools/leicageosystems.svg", label: "Leica Geosystems" },
  { pattern: /microsoft project/i, logo: "/images/tools/microsoftproject.svg", label: "Microsoft Project" },
  { pattern: /planradar/i, logo: "/images/tools/planradar.png", label: "PlanRadar" },
  { pattern: /caterpillar/i, logo: "/images/tools/caterpillar.svg", label: "Caterpillar" },
  { pattern: /bureau veritas/i, logo: "/images/tools/bureauveritas.svg", label: "Bureau Veritas" },
  { pattern: /delta plus/i, logo: "/images/tools/deltaplus.png", label: "Delta Plus" },
  { pattern: /dimo maint/i, logo: "/images/tools/dimomaint.svg", label: "Dimo Maint" },
  { pattern: /stanley/i, logo: "/images/tools/stanley.svg", label: "Stanley" },
  { pattern: /testo/i, logo: "/images/tools/testo.svg", label: "Testo" },
  { pattern: /würth|wurth/i, logo: "/images/tools/wurth.svg", label: "Würth" },
  { pattern: /twimm/i, logo: "/images/tools/twimm.svg", label: "Twimm" },
  { pattern: /coswin/i, logo: "/images/tools/coswin.png", label: "Coswin" },
  { pattern: /eaton/i, logo: "/images/tools/eaton.svg", label: "Eaton" },
  { pattern: /\b3m\b/i, logo: "/images/tools/3m.svg", label: "3M" },
  { pattern: /finsecur/i, logo: "/images/tools/finsecur.svg", label: "Finsecur" },
  { pattern: /legrand/i, logo: "/images/tools/legrand.svg", label: "Legrand" },
  { pattern: /hikvision/i, logo: "/images/tools/hikvision.svg", label: "Hikvision" },
  { pattern: /cisco/i, logo: "/images/tools/cisco.svg", label: "Cisco" },
  { pattern: /ubiquiti/i, logo: "/images/tools/ubiquiti.svg", label: "Ubiquiti" },
  { pattern: /schneider electric/i, logo: "/images/tools/schneiderelectric.svg", label: "Schneider Electric" },
  { pattern: /megger/i, logo: "/images/tools/megger.svg", label: "Megger" },
  { pattern: /hager/i, logo: "/images/tools/hager.png", label: "Hager" },
  { pattern: /longi/i, logo: "/images/tools/longi.png", label: "LONGi" },
  { pattern: /solaredge/i, logo: "/images/tools/solaredge.png", label: "SolarEdge" },
  { pattern: /tesla/i, logo: "/images/tools/tesla.svg", label: "Tesla" },
  { pattern: /k2 systems/i, logo: "/images/tools/k2systems.svg", label: "K2 Systems" },
  { pattern: /victron energy/i, logo: "/images/tools/victronenergy.svg", label: "Victron Energy" },
  { pattern: /seaward/i, logo: "/images/tools/seaward.png", label: "Seaward" },
  { pattern: /hid global/i, logo: "/images/tools/hidglobal.svg", label: "HID Global" },
  { pattern: /zkteco/i, logo: "/images/tools/zkteco.png", label: "ZKTeco" },
  { pattern: /nedap/i, logo: "/images/tools/nedap.svg", label: "Nedap" },
  { pattern: /assa abloy/i, logo: "/images/tools/assaabloy.svg", label: "Assa Abloy" },
  { pattern: /kelio/i, logo: "/images/tools/kelio.png", label: "Kelio" },
  { pattern: /bose professional/i, logo: "/images/tools/boseprofessional.svg", label: "Bose Professional" },
  { pattern: /yamaha/i, logo: "/images/tools/yamaha.svg", label: "Yamaha" },
  { pattern: /shure/i, logo: "/images/tools/shure.svg", label: "Shure" },
  { pattern: /neutrik/i, logo: "/images/tools/neutrik.png", label: "Neutrik" },
  { pattern: /sonos/i, logo: "/images/tools/sonos.svg", label: "Sonos" },
  { pattern: /brüel|bruel/i, logo: "/images/tools/bruelkjaer.png", label: "Brüel & Kjær" },
  { pattern: /somfy/i, logo: "/images/tools/somfy.svg", label: "Somfy" },
  { pattern: /netatmo/i, logo: "/images/tools/netatmo.png", label: "Netatmo" },
  { pattern: /delta dore/i, logo: "/images/tools/deltadore.svg", label: "Delta Dore" },
  { pattern: /siemens/i, logo: "/images/tools/siemens.svg", label: "Siemens" },
  { pattern: /wonderware/i, logo: "/images/tools/wonderware.svg", label: "Wonderware" },
  { pattern: /tridium niagara/i, logo: "/images/tools/tridiumniagara.svg", label: "Tridium Niagara" },
  { pattern: /power bi/i, logo: "/images/tools/powerbi.svg", label: "Power BI" },
];

export function getToolLogo(tool: string): { logo: string; label: string } | null {
  const match = TOOL_LOGO_MATCHERS.find(({ pattern }) => pattern.test(tool));
  return match ? { logo: match.logo, label: match.label } : null;
}
