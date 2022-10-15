globalThis.process = {
	argv: [],
	env: Deno.env.toObject(),
};
// dist/server/entry.mjs
import { Server } from "https://deno.land/std@0.132.0/http/server.ts";
import { fetch } from "https://deno.land/x/file_fetch/mod.ts";
var $$module1$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get $$metadata() {
    return $$metadata$e;
  },
  get default() {
    return $$SubMenu;
  },
  get file() {
    return $$file$e;
  },
  get url() {
    return $$url$e;
  }
}, Symbol.toStringTag, { value: "Module" }));
function Mime$1() {
  this._types = /* @__PURE__ */ Object.create(null);
  this._extensions = /* @__PURE__ */ Object.create(null);
  for (let i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }
  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}
Mime$1.prototype.define = function(typeMap, force) {
  for (let type in typeMap) {
    let extensions = typeMap[type].map(function(t) {
      return t.toLowerCase();
    });
    type = type.toLowerCase();
    for (let i = 0; i < extensions.length; i++) {
      const ext = extensions[i];
      if (ext[0] === "*") {
        continue;
      }
      if (!force && ext in this._types) {
        throw new Error(
          'Attempt to change mapping for "' + ext + '" extension from "' + this._types[ext] + '" to "' + type + '". Pass `force=true` to allow this, otherwise remove "' + ext + '" from the list of extensions for "' + type + '".'
        );
      }
      this._types[ext] = type;
    }
    if (force || !this._extensions[type]) {
      const ext = extensions[0];
      this._extensions[type] = ext[0] !== "*" ? ext : ext.substr(1);
    }
  }
};
Mime$1.prototype.getType = function(path) {
  path = String(path);
  let last = path.replace(/^.*[/\\]/, "").toLowerCase();
  let ext = last.replace(/^.*\./, "").toLowerCase();
  let hasPath = last.length < path.length;
  let hasDot = ext.length < last.length - 1;
  return (hasDot || !hasPath) && this._types[ext] || null;
};
Mime$1.prototype.getExtension = function(type) {
  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
  return type && this._extensions[type.toLowerCase()] || null;
};
var Mime_1 = Mime$1;
var standard = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
var other = { "application/prs.cww": ["cww"], "application/vnd.1000minds.decision-model+xml": ["1km"], "application/vnd.3gpp.pic-bw-large": ["plb"], "application/vnd.3gpp.pic-bw-small": ["psb"], "application/vnd.3gpp.pic-bw-var": ["pvb"], "application/vnd.3gpp2.tcap": ["tcap"], "application/vnd.3m.post-it-notes": ["pwn"], "application/vnd.accpac.simply.aso": ["aso"], "application/vnd.accpac.simply.imp": ["imp"], "application/vnd.acucobol": ["acu"], "application/vnd.acucorp": ["atc", "acutc"], "application/vnd.adobe.air-application-installer-package+zip": ["air"], "application/vnd.adobe.formscentral.fcdt": ["fcdt"], "application/vnd.adobe.fxp": ["fxp", "fxpl"], "application/vnd.adobe.xdp+xml": ["xdp"], "application/vnd.adobe.xfdf": ["xfdf"], "application/vnd.ahead.space": ["ahead"], "application/vnd.airzip.filesecure.azf": ["azf"], "application/vnd.airzip.filesecure.azs": ["azs"], "application/vnd.amazon.ebook": ["azw"], "application/vnd.americandynamics.acc": ["acc"], "application/vnd.amiga.ami": ["ami"], "application/vnd.android.package-archive": ["apk"], "application/vnd.anser-web-certificate-issue-initiation": ["cii"], "application/vnd.anser-web-funds-transfer-initiation": ["fti"], "application/vnd.antix.game-component": ["atx"], "application/vnd.apple.installer+xml": ["mpkg"], "application/vnd.apple.keynote": ["key"], "application/vnd.apple.mpegurl": ["m3u8"], "application/vnd.apple.numbers": ["numbers"], "application/vnd.apple.pages": ["pages"], "application/vnd.apple.pkpass": ["pkpass"], "application/vnd.aristanetworks.swi": ["swi"], "application/vnd.astraea-software.iota": ["iota"], "application/vnd.audiograph": ["aep"], "application/vnd.balsamiq.bmml+xml": ["bmml"], "application/vnd.blueice.multipass": ["mpm"], "application/vnd.bmi": ["bmi"], "application/vnd.businessobjects": ["rep"], "application/vnd.chemdraw+xml": ["cdxml"], "application/vnd.chipnuts.karaoke-mmd": ["mmd"], "application/vnd.cinderella": ["cdy"], "application/vnd.citationstyles.style+xml": ["csl"], "application/vnd.claymore": ["cla"], "application/vnd.cloanto.rp9": ["rp9"], "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"], "application/vnd.cluetrust.cartomobile-config": ["c11amc"], "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"], "application/vnd.commonspace": ["csp"], "application/vnd.contact.cmsg": ["cdbcmsg"], "application/vnd.cosmocaller": ["cmc"], "application/vnd.crick.clicker": ["clkx"], "application/vnd.crick.clicker.keyboard": ["clkk"], "application/vnd.crick.clicker.palette": ["clkp"], "application/vnd.crick.clicker.template": ["clkt"], "application/vnd.crick.clicker.wordbank": ["clkw"], "application/vnd.criticaltools.wbs+xml": ["wbs"], "application/vnd.ctc-posml": ["pml"], "application/vnd.cups-ppd": ["ppd"], "application/vnd.curl.car": ["car"], "application/vnd.curl.pcurl": ["pcurl"], "application/vnd.dart": ["dart"], "application/vnd.data-vision.rdz": ["rdz"], "application/vnd.dbf": ["dbf"], "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"], "application/vnd.dece.ttml+xml": ["uvt", "uvvt"], "application/vnd.dece.unspecified": ["uvx", "uvvx"], "application/vnd.dece.zip": ["uvz", "uvvz"], "application/vnd.denovo.fcselayout-link": ["fe_launch"], "application/vnd.dna": ["dna"], "application/vnd.dolby.mlp": ["mlp"], "application/vnd.dpgraph": ["dpg"], "application/vnd.dreamfactory": ["dfac"], "application/vnd.ds-keypoint": ["kpxx"], "application/vnd.dvb.ait": ["ait"], "application/vnd.dvb.service": ["svc"], "application/vnd.dynageo": ["geo"], "application/vnd.ecowin.chart": ["mag"], "application/vnd.enliven": ["nml"], "application/vnd.epson.esf": ["esf"], "application/vnd.epson.msf": ["msf"], "application/vnd.epson.quickanime": ["qam"], "application/vnd.epson.salt": ["slt"], "application/vnd.epson.ssf": ["ssf"], "application/vnd.eszigno3+xml": ["es3", "et3"], "application/vnd.ezpix-album": ["ez2"], "application/vnd.ezpix-package": ["ez3"], "application/vnd.fdf": ["fdf"], "application/vnd.fdsn.mseed": ["mseed"], "application/vnd.fdsn.seed": ["seed", "dataless"], "application/vnd.flographit": ["gph"], "application/vnd.fluxtime.clip": ["ftc"], "application/vnd.framemaker": ["fm", "frame", "maker", "book"], "application/vnd.frogans.fnc": ["fnc"], "application/vnd.frogans.ltf": ["ltf"], "application/vnd.fsc.weblaunch": ["fsc"], "application/vnd.fujitsu.oasys": ["oas"], "application/vnd.fujitsu.oasys2": ["oa2"], "application/vnd.fujitsu.oasys3": ["oa3"], "application/vnd.fujitsu.oasysgp": ["fg5"], "application/vnd.fujitsu.oasysprs": ["bh2"], "application/vnd.fujixerox.ddd": ["ddd"], "application/vnd.fujixerox.docuworks": ["xdw"], "application/vnd.fujixerox.docuworks.binder": ["xbd"], "application/vnd.fuzzysheet": ["fzs"], "application/vnd.genomatix.tuxedo": ["txd"], "application/vnd.geogebra.file": ["ggb"], "application/vnd.geogebra.tool": ["ggt"], "application/vnd.geometry-explorer": ["gex", "gre"], "application/vnd.geonext": ["gxt"], "application/vnd.geoplan": ["g2w"], "application/vnd.geospace": ["g3w"], "application/vnd.gmx": ["gmx"], "application/vnd.google-apps.document": ["gdoc"], "application/vnd.google-apps.presentation": ["gslides"], "application/vnd.google-apps.spreadsheet": ["gsheet"], "application/vnd.google-earth.kml+xml": ["kml"], "application/vnd.google-earth.kmz": ["kmz"], "application/vnd.grafeq": ["gqf", "gqs"], "application/vnd.groove-account": ["gac"], "application/vnd.groove-help": ["ghf"], "application/vnd.groove-identity-message": ["gim"], "application/vnd.groove-injector": ["grv"], "application/vnd.groove-tool-message": ["gtm"], "application/vnd.groove-tool-template": ["tpl"], "application/vnd.groove-vcard": ["vcg"], "application/vnd.hal+xml": ["hal"], "application/vnd.handheld-entertainment+xml": ["zmm"], "application/vnd.hbci": ["hbci"], "application/vnd.hhe.lesson-player": ["les"], "application/vnd.hp-hpgl": ["hpgl"], "application/vnd.hp-hpid": ["hpid"], "application/vnd.hp-hps": ["hps"], "application/vnd.hp-jlyt": ["jlt"], "application/vnd.hp-pcl": ["pcl"], "application/vnd.hp-pclxl": ["pclxl"], "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"], "application/vnd.ibm.minipay": ["mpy"], "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"], "application/vnd.ibm.rights-management": ["irm"], "application/vnd.ibm.secure-container": ["sc"], "application/vnd.iccprofile": ["icc", "icm"], "application/vnd.igloader": ["igl"], "application/vnd.immervision-ivp": ["ivp"], "application/vnd.immervision-ivu": ["ivu"], "application/vnd.insors.igm": ["igm"], "application/vnd.intercon.formnet": ["xpw", "xpx"], "application/vnd.intergeo": ["i2g"], "application/vnd.intu.qbo": ["qbo"], "application/vnd.intu.qfx": ["qfx"], "application/vnd.ipunplugged.rcprofile": ["rcprofile"], "application/vnd.irepository.package+xml": ["irp"], "application/vnd.is-xpr": ["xpr"], "application/vnd.isac.fcs": ["fcs"], "application/vnd.jam": ["jam"], "application/vnd.jcp.javame.midlet-rms": ["rms"], "application/vnd.jisp": ["jisp"], "application/vnd.joost.joda-archive": ["joda"], "application/vnd.kahootz": ["ktz", "ktr"], "application/vnd.kde.karbon": ["karbon"], "application/vnd.kde.kchart": ["chrt"], "application/vnd.kde.kformula": ["kfo"], "application/vnd.kde.kivio": ["flw"], "application/vnd.kde.kontour": ["kon"], "application/vnd.kde.kpresenter": ["kpr", "kpt"], "application/vnd.kde.kspread": ["ksp"], "application/vnd.kde.kword": ["kwd", "kwt"], "application/vnd.kenameaapp": ["htke"], "application/vnd.kidspiration": ["kia"], "application/vnd.kinar": ["kne", "knp"], "application/vnd.koan": ["skp", "skd", "skt", "skm"], "application/vnd.kodak-descriptor": ["sse"], "application/vnd.las.las+xml": ["lasxml"], "application/vnd.llamagraphics.life-balance.desktop": ["lbd"], "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"], "application/vnd.lotus-1-2-3": ["123"], "application/vnd.lotus-approach": ["apr"], "application/vnd.lotus-freelance": ["pre"], "application/vnd.lotus-notes": ["nsf"], "application/vnd.lotus-organizer": ["org"], "application/vnd.lotus-screencam": ["scm"], "application/vnd.lotus-wordpro": ["lwp"], "application/vnd.macports.portpkg": ["portpkg"], "application/vnd.mapbox-vector-tile": ["mvt"], "application/vnd.mcd": ["mcd"], "application/vnd.medcalcdata": ["mc1"], "application/vnd.mediastation.cdkey": ["cdkey"], "application/vnd.mfer": ["mwf"], "application/vnd.mfmp": ["mfm"], "application/vnd.micrografx.flo": ["flo"], "application/vnd.micrografx.igx": ["igx"], "application/vnd.mif": ["mif"], "application/vnd.mobius.daf": ["daf"], "application/vnd.mobius.dis": ["dis"], "application/vnd.mobius.mbk": ["mbk"], "application/vnd.mobius.mqy": ["mqy"], "application/vnd.mobius.msl": ["msl"], "application/vnd.mobius.plc": ["plc"], "application/vnd.mobius.txf": ["txf"], "application/vnd.mophun.application": ["mpn"], "application/vnd.mophun.certificate": ["mpc"], "application/vnd.mozilla.xul+xml": ["xul"], "application/vnd.ms-artgalry": ["cil"], "application/vnd.ms-cab-compressed": ["cab"], "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"], "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"], "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"], "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"], "application/vnd.ms-excel.template.macroenabled.12": ["xltm"], "application/vnd.ms-fontobject": ["eot"], "application/vnd.ms-htmlhelp": ["chm"], "application/vnd.ms-ims": ["ims"], "application/vnd.ms-lrm": ["lrm"], "application/vnd.ms-officetheme": ["thmx"], "application/vnd.ms-outlook": ["msg"], "application/vnd.ms-pki.seccat": ["cat"], "application/vnd.ms-pki.stl": ["*stl"], "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"], "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"], "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"], "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"], "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"], "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"], "application/vnd.ms-project": ["mpp", "mpt"], "application/vnd.ms-word.document.macroenabled.12": ["docm"], "application/vnd.ms-word.template.macroenabled.12": ["dotm"], "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"], "application/vnd.ms-wpl": ["wpl"], "application/vnd.ms-xpsdocument": ["xps"], "application/vnd.mseq": ["mseq"], "application/vnd.musician": ["mus"], "application/vnd.muvee.style": ["msty"], "application/vnd.mynfc": ["taglet"], "application/vnd.neurolanguage.nlu": ["nlu"], "application/vnd.nitf": ["ntf", "nitf"], "application/vnd.noblenet-directory": ["nnd"], "application/vnd.noblenet-sealer": ["nns"], "application/vnd.noblenet-web": ["nnw"], "application/vnd.nokia.n-gage.ac+xml": ["*ac"], "application/vnd.nokia.n-gage.data": ["ngdat"], "application/vnd.nokia.n-gage.symbian.install": ["n-gage"], "application/vnd.nokia.radio-preset": ["rpst"], "application/vnd.nokia.radio-presets": ["rpss"], "application/vnd.novadigm.edm": ["edm"], "application/vnd.novadigm.edx": ["edx"], "application/vnd.novadigm.ext": ["ext"], "application/vnd.oasis.opendocument.chart": ["odc"], "application/vnd.oasis.opendocument.chart-template": ["otc"], "application/vnd.oasis.opendocument.database": ["odb"], "application/vnd.oasis.opendocument.formula": ["odf"], "application/vnd.oasis.opendocument.formula-template": ["odft"], "application/vnd.oasis.opendocument.graphics": ["odg"], "application/vnd.oasis.opendocument.graphics-template": ["otg"], "application/vnd.oasis.opendocument.image": ["odi"], "application/vnd.oasis.opendocument.image-template": ["oti"], "application/vnd.oasis.opendocument.presentation": ["odp"], "application/vnd.oasis.opendocument.presentation-template": ["otp"], "application/vnd.oasis.opendocument.spreadsheet": ["ods"], "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"], "application/vnd.oasis.opendocument.text": ["odt"], "application/vnd.oasis.opendocument.text-master": ["odm"], "application/vnd.oasis.opendocument.text-template": ["ott"], "application/vnd.oasis.opendocument.text-web": ["oth"], "application/vnd.olpc-sugar": ["xo"], "application/vnd.oma.dd2+xml": ["dd2"], "application/vnd.openblox.game+xml": ["obgx"], "application/vnd.openofficeorg.extension": ["oxt"], "application/vnd.openstreetmap.data+xml": ["osm"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"], "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"], "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"], "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"], "application/vnd.osgeo.mapguide.package": ["mgp"], "application/vnd.osgi.dp": ["dp"], "application/vnd.osgi.subsystem": ["esa"], "application/vnd.palm": ["pdb", "pqa", "oprc"], "application/vnd.pawaafile": ["paw"], "application/vnd.pg.format": ["str"], "application/vnd.pg.osasli": ["ei6"], "application/vnd.picsel": ["efif"], "application/vnd.pmi.widget": ["wg"], "application/vnd.pocketlearn": ["plf"], "application/vnd.powerbuilder6": ["pbd"], "application/vnd.previewsystems.box": ["box"], "application/vnd.proteus.magazine": ["mgz"], "application/vnd.publishare-delta-tree": ["qps"], "application/vnd.pvi.ptid1": ["ptid"], "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"], "application/vnd.rar": ["rar"], "application/vnd.realvnc.bed": ["bed"], "application/vnd.recordare.musicxml": ["mxl"], "application/vnd.recordare.musicxml+xml": ["musicxml"], "application/vnd.rig.cryptonote": ["cryptonote"], "application/vnd.rim.cod": ["cod"], "application/vnd.rn-realmedia": ["rm"], "application/vnd.rn-realmedia-vbr": ["rmvb"], "application/vnd.route66.link66+xml": ["link66"], "application/vnd.sailingtracker.track": ["st"], "application/vnd.seemail": ["see"], "application/vnd.sema": ["sema"], "application/vnd.semd": ["semd"], "application/vnd.semf": ["semf"], "application/vnd.shana.informed.formdata": ["ifm"], "application/vnd.shana.informed.formtemplate": ["itp"], "application/vnd.shana.informed.interchange": ["iif"], "application/vnd.shana.informed.package": ["ipk"], "application/vnd.simtech-mindmapper": ["twd", "twds"], "application/vnd.smaf": ["mmf"], "application/vnd.smart.teacher": ["teacher"], "application/vnd.software602.filler.form+xml": ["fo"], "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"], "application/vnd.spotfire.dxp": ["dxp"], "application/vnd.spotfire.sfs": ["sfs"], "application/vnd.stardivision.calc": ["sdc"], "application/vnd.stardivision.draw": ["sda"], "application/vnd.stardivision.impress": ["sdd"], "application/vnd.stardivision.math": ["smf"], "application/vnd.stardivision.writer": ["sdw", "vor"], "application/vnd.stardivision.writer-global": ["sgl"], "application/vnd.stepmania.package": ["smzip"], "application/vnd.stepmania.stepchart": ["sm"], "application/vnd.sun.wadl+xml": ["wadl"], "application/vnd.sun.xml.calc": ["sxc"], "application/vnd.sun.xml.calc.template": ["stc"], "application/vnd.sun.xml.draw": ["sxd"], "application/vnd.sun.xml.draw.template": ["std"], "application/vnd.sun.xml.impress": ["sxi"], "application/vnd.sun.xml.impress.template": ["sti"], "application/vnd.sun.xml.math": ["sxm"], "application/vnd.sun.xml.writer": ["sxw"], "application/vnd.sun.xml.writer.global": ["sxg"], "application/vnd.sun.xml.writer.template": ["stw"], "application/vnd.sus-calendar": ["sus", "susp"], "application/vnd.svd": ["svd"], "application/vnd.symbian.install": ["sis", "sisx"], "application/vnd.syncml+xml": ["xsm"], "application/vnd.syncml.dm+wbxml": ["bdm"], "application/vnd.syncml.dm+xml": ["xdm"], "application/vnd.syncml.dmddf+xml": ["ddf"], "application/vnd.tao.intent-module-archive": ["tao"], "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"], "application/vnd.tmobile-livetv": ["tmo"], "application/vnd.trid.tpt": ["tpt"], "application/vnd.triscape.mxs": ["mxs"], "application/vnd.trueapp": ["tra"], "application/vnd.ufdl": ["ufd", "ufdl"], "application/vnd.uiq.theme": ["utz"], "application/vnd.umajin": ["umj"], "application/vnd.unity": ["unityweb"], "application/vnd.uoml+xml": ["uoml"], "application/vnd.vcx": ["vcx"], "application/vnd.visio": ["vsd", "vst", "vss", "vsw"], "application/vnd.visionary": ["vis"], "application/vnd.vsf": ["vsf"], "application/vnd.wap.wbxml": ["wbxml"], "application/vnd.wap.wmlc": ["wmlc"], "application/vnd.wap.wmlscriptc": ["wmlsc"], "application/vnd.webturbo": ["wtb"], "application/vnd.wolfram.player": ["nbp"], "application/vnd.wordperfect": ["wpd"], "application/vnd.wqd": ["wqd"], "application/vnd.wt.stf": ["stf"], "application/vnd.xara": ["xar"], "application/vnd.xfdl": ["xfdl"], "application/vnd.yamaha.hv-dic": ["hvd"], "application/vnd.yamaha.hv-script": ["hvs"], "application/vnd.yamaha.hv-voice": ["hvp"], "application/vnd.yamaha.openscoreformat": ["osf"], "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"], "application/vnd.yamaha.smaf-audio": ["saf"], "application/vnd.yamaha.smaf-phrase": ["spf"], "application/vnd.yellowriver-custom-menu": ["cmp"], "application/vnd.zul": ["zir", "zirz"], "application/vnd.zzazz.deck+xml": ["zaz"], "application/x-7z-compressed": ["7z"], "application/x-abiword": ["abw"], "application/x-ace-compressed": ["ace"], "application/x-apple-diskimage": ["*dmg"], "application/x-arj": ["arj"], "application/x-authorware-bin": ["aab", "x32", "u32", "vox"], "application/x-authorware-map": ["aam"], "application/x-authorware-seg": ["aas"], "application/x-bcpio": ["bcpio"], "application/x-bdoc": ["*bdoc"], "application/x-bittorrent": ["torrent"], "application/x-blorb": ["blb", "blorb"], "application/x-bzip": ["bz"], "application/x-bzip2": ["bz2", "boz"], "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"], "application/x-cdlink": ["vcd"], "application/x-cfs-compressed": ["cfs"], "application/x-chat": ["chat"], "application/x-chess-pgn": ["pgn"], "application/x-chrome-extension": ["crx"], "application/x-cocoa": ["cco"], "application/x-conference": ["nsc"], "application/x-cpio": ["cpio"], "application/x-csh": ["csh"], "application/x-debian-package": ["*deb", "udeb"], "application/x-dgc-compressed": ["dgc"], "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"], "application/x-doom": ["wad"], "application/x-dtbncx+xml": ["ncx"], "application/x-dtbook+xml": ["dtb"], "application/x-dtbresource+xml": ["res"], "application/x-dvi": ["dvi"], "application/x-envoy": ["evy"], "application/x-eva": ["eva"], "application/x-font-bdf": ["bdf"], "application/x-font-ghostscript": ["gsf"], "application/x-font-linux-psf": ["psf"], "application/x-font-pcf": ["pcf"], "application/x-font-snf": ["snf"], "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"], "application/x-freearc": ["arc"], "application/x-futuresplash": ["spl"], "application/x-gca-compressed": ["gca"], "application/x-glulx": ["ulx"], "application/x-gnumeric": ["gnumeric"], "application/x-gramps-xml": ["gramps"], "application/x-gtar": ["gtar"], "application/x-hdf": ["hdf"], "application/x-httpd-php": ["php"], "application/x-install-instructions": ["install"], "application/x-iso9660-image": ["*iso"], "application/x-iwork-keynote-sffkey": ["*key"], "application/x-iwork-numbers-sffnumbers": ["*numbers"], "application/x-iwork-pages-sffpages": ["*pages"], "application/x-java-archive-diff": ["jardiff"], "application/x-java-jnlp-file": ["jnlp"], "application/x-keepass2": ["kdbx"], "application/x-latex": ["latex"], "application/x-lua-bytecode": ["luac"], "application/x-lzh-compressed": ["lzh", "lha"], "application/x-makeself": ["run"], "application/x-mie": ["mie"], "application/x-mobipocket-ebook": ["prc", "mobi"], "application/x-ms-application": ["application"], "application/x-ms-shortcut": ["lnk"], "application/x-ms-wmd": ["wmd"], "application/x-ms-wmz": ["wmz"], "application/x-ms-xbap": ["xbap"], "application/x-msaccess": ["mdb"], "application/x-msbinder": ["obd"], "application/x-mscardfile": ["crd"], "application/x-msclip": ["clp"], "application/x-msdos-program": ["*exe"], "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"], "application/x-msmediaview": ["mvb", "m13", "m14"], "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"], "application/x-msmoney": ["mny"], "application/x-mspublisher": ["pub"], "application/x-msschedule": ["scd"], "application/x-msterminal": ["trm"], "application/x-mswrite": ["wri"], "application/x-netcdf": ["nc", "cdf"], "application/x-ns-proxy-autoconfig": ["pac"], "application/x-nzb": ["nzb"], "application/x-perl": ["pl", "pm"], "application/x-pilot": ["*prc", "*pdb"], "application/x-pkcs12": ["p12", "pfx"], "application/x-pkcs7-certificates": ["p7b", "spc"], "application/x-pkcs7-certreqresp": ["p7r"], "application/x-rar-compressed": ["*rar"], "application/x-redhat-package-manager": ["rpm"], "application/x-research-info-systems": ["ris"], "application/x-sea": ["sea"], "application/x-sh": ["sh"], "application/x-shar": ["shar"], "application/x-shockwave-flash": ["swf"], "application/x-silverlight-app": ["xap"], "application/x-sql": ["sql"], "application/x-stuffit": ["sit"], "application/x-stuffitx": ["sitx"], "application/x-subrip": ["srt"], "application/x-sv4cpio": ["sv4cpio"], "application/x-sv4crc": ["sv4crc"], "application/x-t3vm-image": ["t3"], "application/x-tads": ["gam"], "application/x-tar": ["tar"], "application/x-tcl": ["tcl", "tk"], "application/x-tex": ["tex"], "application/x-tex-tfm": ["tfm"], "application/x-texinfo": ["texinfo", "texi"], "application/x-tgif": ["*obj"], "application/x-ustar": ["ustar"], "application/x-virtualbox-hdd": ["hdd"], "application/x-virtualbox-ova": ["ova"], "application/x-virtualbox-ovf": ["ovf"], "application/x-virtualbox-vbox": ["vbox"], "application/x-virtualbox-vbox-extpack": ["vbox-extpack"], "application/x-virtualbox-vdi": ["vdi"], "application/x-virtualbox-vhd": ["vhd"], "application/x-virtualbox-vmdk": ["vmdk"], "application/x-wais-source": ["src"], "application/x-web-app-manifest+json": ["webapp"], "application/x-x509-ca-cert": ["der", "crt", "pem"], "application/x-xfig": ["fig"], "application/x-xliff+xml": ["*xlf"], "application/x-xpinstall": ["xpi"], "application/x-xz": ["xz"], "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"], "audio/vnd.dece.audio": ["uva", "uvva"], "audio/vnd.digital-winds": ["eol"], "audio/vnd.dra": ["dra"], "audio/vnd.dts": ["dts"], "audio/vnd.dts.hd": ["dtshd"], "audio/vnd.lucent.voice": ["lvp"], "audio/vnd.ms-playready.media.pya": ["pya"], "audio/vnd.nuera.ecelp4800": ["ecelp4800"], "audio/vnd.nuera.ecelp7470": ["ecelp7470"], "audio/vnd.nuera.ecelp9600": ["ecelp9600"], "audio/vnd.rip": ["rip"], "audio/x-aac": ["aac"], "audio/x-aiff": ["aif", "aiff", "aifc"], "audio/x-caf": ["caf"], "audio/x-flac": ["flac"], "audio/x-m4a": ["*m4a"], "audio/x-matroska": ["mka"], "audio/x-mpegurl": ["m3u"], "audio/x-ms-wax": ["wax"], "audio/x-ms-wma": ["wma"], "audio/x-pn-realaudio": ["ram", "ra"], "audio/x-pn-realaudio-plugin": ["rmp"], "audio/x-realaudio": ["*ra"], "audio/x-wav": ["*wav"], "chemical/x-cdx": ["cdx"], "chemical/x-cif": ["cif"], "chemical/x-cmdf": ["cmdf"], "chemical/x-cml": ["cml"], "chemical/x-csml": ["csml"], "chemical/x-xyz": ["xyz"], "image/prs.btif": ["btif"], "image/prs.pti": ["pti"], "image/vnd.adobe.photoshop": ["psd"], "image/vnd.airzip.accelerator.azv": ["azv"], "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"], "image/vnd.djvu": ["djvu", "djv"], "image/vnd.dvb.subtitle": ["*sub"], "image/vnd.dwg": ["dwg"], "image/vnd.dxf": ["dxf"], "image/vnd.fastbidsheet": ["fbs"], "image/vnd.fpx": ["fpx"], "image/vnd.fst": ["fst"], "image/vnd.fujixerox.edmics-mmr": ["mmr"], "image/vnd.fujixerox.edmics-rlc": ["rlc"], "image/vnd.microsoft.icon": ["ico"], "image/vnd.ms-dds": ["dds"], "image/vnd.ms-modi": ["mdi"], "image/vnd.ms-photo": ["wdp"], "image/vnd.net-fpx": ["npx"], "image/vnd.pco.b16": ["b16"], "image/vnd.tencent.tap": ["tap"], "image/vnd.valve.source.texture": ["vtf"], "image/vnd.wap.wbmp": ["wbmp"], "image/vnd.xiff": ["xif"], "image/vnd.zbrush.pcx": ["pcx"], "image/x-3ds": ["3ds"], "image/x-cmu-raster": ["ras"], "image/x-cmx": ["cmx"], "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"], "image/x-icon": ["*ico"], "image/x-jng": ["jng"], "image/x-mrsid-image": ["sid"], "image/x-ms-bmp": ["*bmp"], "image/x-pcx": ["*pcx"], "image/x-pict": ["pic", "pct"], "image/x-portable-anymap": ["pnm"], "image/x-portable-bitmap": ["pbm"], "image/x-portable-graymap": ["pgm"], "image/x-portable-pixmap": ["ppm"], "image/x-rgb": ["rgb"], "image/x-tga": ["tga"], "image/x-xbitmap": ["xbm"], "image/x-xpixmap": ["xpm"], "image/x-xwindowdump": ["xwd"], "message/vnd.wfa.wsc": ["wsc"], "model/vnd.collada+xml": ["dae"], "model/vnd.dwf": ["dwf"], "model/vnd.gdl": ["gdl"], "model/vnd.gtw": ["gtw"], "model/vnd.mts": ["mts"], "model/vnd.opengex": ["ogex"], "model/vnd.parasolid.transmit.binary": ["x_b"], "model/vnd.parasolid.transmit.text": ["x_t"], "model/vnd.sap.vds": ["vds"], "model/vnd.usdz+zip": ["usdz"], "model/vnd.valve.source.compiled-map": ["bsp"], "model/vnd.vtu": ["vtu"], "text/prs.lines.tag": ["dsc"], "text/vnd.curl": ["curl"], "text/vnd.curl.dcurl": ["dcurl"], "text/vnd.curl.mcurl": ["mcurl"], "text/vnd.curl.scurl": ["scurl"], "text/vnd.dvb.subtitle": ["sub"], "text/vnd.fly": ["fly"], "text/vnd.fmi.flexstor": ["flx"], "text/vnd.graphviz": ["gv"], "text/vnd.in3d.3dml": ["3dml"], "text/vnd.in3d.spot": ["spot"], "text/vnd.sun.j2me.app-descriptor": ["jad"], "text/vnd.wap.wml": ["wml"], "text/vnd.wap.wmlscript": ["wmls"], "text/x-asm": ["s", "asm"], "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"], "text/x-component": ["htc"], "text/x-fortran": ["f", "for", "f77", "f90"], "text/x-handlebars-template": ["hbs"], "text/x-java-source": ["java"], "text/x-lua": ["lua"], "text/x-markdown": ["mkd"], "text/x-nfo": ["nfo"], "text/x-opml": ["opml"], "text/x-org": ["*org"], "text/x-pascal": ["p", "pas"], "text/x-processing": ["pde"], "text/x-sass": ["sass"], "text/x-scss": ["scss"], "text/x-setext": ["etx"], "text/x-sfv": ["sfv"], "text/x-suse-ymp": ["ymp"], "text/x-uuencode": ["uu"], "text/x-vcalendar": ["vcs"], "text/x-vcard": ["vcf"], "video/vnd.dece.hd": ["uvh", "uvvh"], "video/vnd.dece.mobile": ["uvm", "uvvm"], "video/vnd.dece.pd": ["uvp", "uvvp"], "video/vnd.dece.sd": ["uvs", "uvvs"], "video/vnd.dece.video": ["uvv", "uvvv"], "video/vnd.dvb.file": ["dvb"], "video/vnd.fvt": ["fvt"], "video/vnd.mpegurl": ["mxu", "m4u"], "video/vnd.ms-playready.media.pyv": ["pyv"], "video/vnd.uvvu.mp4": ["uvu", "uvvu"], "video/vnd.vivo": ["viv"], "video/x-f4v": ["f4v"], "video/x-fli": ["fli"], "video/x-flv": ["flv"], "video/x-m4v": ["m4v"], "video/x-matroska": ["mkv", "mk3d", "mks"], "video/x-mng": ["mng"], "video/x-ms-asf": ["asf", "asx"], "video/x-ms-vob": ["vob"], "video/x-ms-wm": ["wm"], "video/x-ms-wmv": ["wmv"], "video/x-ms-wmx": ["wmx"], "video/x-ms-wvx": ["wvx"], "video/x-msvideo": ["avi"], "video/x-sgi-movie": ["movie"], "video/x-smv": ["smv"], "x-conference/x-cooltalk": ["ice"] };
var Mime = Mime_1;
var mime = new Mime(standard, other);
var parse_1 = parse$1;
var serialize_1 = serialize;
var __toString = Object.prototype.toString;
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function parse$1(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  var obj = {};
  var opt = options || {};
  var dec = opt.decode || decode;
  var index = 0;
  while (index < str.length) {
    var eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    var endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    var key = str.slice(index, eqIdx).trim();
    if (void 0 === obj[key]) {
      var val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  var value = enc(val);
  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError("argument val is invalid");
  }
  var str = name + "=" + value;
  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    var expires = opt.expires;
    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
}
function decode(str) {
  return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
}
function encode(val) {
  return encodeURIComponent(val);
}
function isDate(val) {
  return __toString.call(val) === "[object Date]" || val instanceof Date;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch (e) {
    return str;
  }
}
var __accessCheck$3 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$3 = (obj, member, getter) => {
  __accessCheck$3(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$3 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$3 = (obj, member, value, setter) => {
  __accessCheck$3(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod$1 = (obj, member, method) => {
  __accessCheck$3(obj, member, "access private method");
  return method;
};
var _request;
var _requestValues;
var _outgoing;
var _ensureParsed;
var ensureParsed_fn;
var _ensureOutgoingMap;
var ensureOutgoingMap_fn;
var _parse;
var parse_fn;
var DELETED_EXPIRATION = new Date(0);
var DELETED_VALUE = "deleted";
var AstroCookie = class {
  constructor(value) {
    this.value = value;
  }
  json() {
    if (this.value === void 0) {
      throw new Error(`Cannot convert undefined to an object.`);
    }
    return JSON.parse(this.value);
  }
  number() {
    return Number(this.value);
  }
  boolean() {
    if (this.value === "false")
      return false;
    if (this.value === "0")
      return false;
    return Boolean(this.value);
  }
};
var AstroCookies = class {
  constructor(request) {
    __privateAdd$3(this, _ensureParsed);
    __privateAdd$3(this, _ensureOutgoingMap);
    __privateAdd$3(this, _parse);
    __privateAdd$3(this, _request, void 0);
    __privateAdd$3(this, _requestValues, void 0);
    __privateAdd$3(this, _outgoing, void 0);
    __privateSet$3(this, _request, request);
    __privateSet$3(this, _requestValues, null);
    __privateSet$3(this, _outgoing, null);
  }
  delete(key, options) {
    const serializeOptions = {
      expires: DELETED_EXPIRATION
    };
    if (options == null ? void 0 : options.path) {
      serializeOptions.path = options.path;
    }
    __privateMethod$1(this, _ensureOutgoingMap, ensureOutgoingMap_fn).call(this).set(key, [
      DELETED_VALUE,
      serialize_1(key, DELETED_VALUE, serializeOptions),
      false
    ]);
  }
  get(key) {
    if (__privateGet$3(this, _outgoing) !== null && __privateGet$3(this, _outgoing).has(key)) {
      let [serializedValue, , isSetValue] = __privateGet$3(this, _outgoing).get(key);
      if (isSetValue) {
        return new AstroCookie(serializedValue);
      } else {
        return new AstroCookie(void 0);
      }
    }
    const values = __privateMethod$1(this, _ensureParsed, ensureParsed_fn).call(this);
    const value = values[key];
    return new AstroCookie(value);
  }
  has(key) {
    if (__privateGet$3(this, _outgoing) !== null && __privateGet$3(this, _outgoing).has(key)) {
      let [, , isSetValue] = __privateGet$3(this, _outgoing).get(key);
      return isSetValue;
    }
    const values = __privateMethod$1(this, _ensureParsed, ensureParsed_fn).call(this);
    return !!values[key];
  }
  set(key, value, options) {
    let serializedValue;
    if (typeof value === "string") {
      serializedValue = value;
    } else {
      let toStringValue = value.toString();
      if (toStringValue === Object.prototype.toString.call(value)) {
        serializedValue = JSON.stringify(value);
      } else {
        serializedValue = toStringValue;
      }
    }
    const serializeOptions = {};
    if (options) {
      Object.assign(serializeOptions, options);
    }
    __privateMethod$1(this, _ensureOutgoingMap, ensureOutgoingMap_fn).call(this).set(key, [
      serializedValue,
      serialize_1(key, serializedValue, serializeOptions),
      true
    ]);
  }
  *headers() {
    if (__privateGet$3(this, _outgoing) == null)
      return;
    for (const [, value] of __privateGet$3(this, _outgoing)) {
      yield value[1];
    }
  }
};
_request = /* @__PURE__ */ new WeakMap();
_requestValues = /* @__PURE__ */ new WeakMap();
_outgoing = /* @__PURE__ */ new WeakMap();
_ensureParsed = /* @__PURE__ */ new WeakSet();
ensureParsed_fn = function() {
  if (!__privateGet$3(this, _requestValues)) {
    __privateMethod$1(this, _parse, parse_fn).call(this);
  }
  if (!__privateGet$3(this, _requestValues)) {
    __privateSet$3(this, _requestValues, {});
  }
  return __privateGet$3(this, _requestValues);
};
_ensureOutgoingMap = /* @__PURE__ */ new WeakSet();
ensureOutgoingMap_fn = function() {
  if (!__privateGet$3(this, _outgoing)) {
    __privateSet$3(this, _outgoing, /* @__PURE__ */ new Map());
  }
  return __privateGet$3(this, _outgoing);
};
_parse = /* @__PURE__ */ new WeakSet();
parse_fn = function() {
  const raw = __privateGet$3(this, _request).headers.get("cookie");
  if (!raw) {
    return;
  }
  __privateSet$3(this, _requestValues, parse_1(raw));
};
var astroCookiesSymbol = Symbol.for("astro.cookies");
function attachToResponse(response, cookies) {
  Reflect.set(response, astroCookiesSymbol, cookies);
}
function getFromResponse(response) {
  let cookies = Reflect.get(response, astroCookiesSymbol);
  if (cookies != null) {
    return cookies;
  } else {
    return void 0;
  }
}
function* getSetCookiesFromResponse(response) {
  const cookies = getFromResponse(response);
  if (!cookies) {
    return;
  }
  for (const headerValue of cookies.headers()) {
    yield headerValue;
  }
}
var ASTRO_VERSION = "1.4.2";
function createDeprecatedFetchContentFn() {
  return () => {
    throw new Error("Deprecated: Astro.fetchContent() has been replaced with Astro.glob().");
  };
}
function createAstroGlobFn() {
  const globHandler = (importMetaGlobResult, globValue) => {
    let allEntries = [...Object.values(importMetaGlobResult)];
    if (allEntries.length === 0) {
      throw new Error(`Astro.glob(${JSON.stringify(globValue())}) - no matches found.`);
    }
    return Promise.all(allEntries.map((fn) => fn()));
  };
  return globHandler;
}
function createAstro(filePathname, _site, projectRootStr) {
  const site = _site ? new URL(_site) : void 0;
  const referenceURL = new URL(filePathname, `http://localhost`);
  const projectRoot = new URL(projectRootStr);
  return {
    site,
    generator: `Astro v${ASTRO_VERSION}`,
    fetchContent: createDeprecatedFetchContentFn(),
    glob: createAstroGlobFn(),
    resolve(...segments) {
      let resolved = segments.reduce((u, segment) => new URL(segment, u), referenceURL).pathname;
      if (resolved.startsWith(projectRoot.pathname)) {
        resolved = "/" + resolved.slice(projectRoot.pathname.length);
      }
      return resolved;
    }
  };
}
function getHandlerFromModule(mod, method) {
  if (mod[method]) {
    return mod[method];
  }
  if (method === "delete" && mod["del"]) {
    return mod["del"];
  }
  if (mod["all"]) {
    return mod["all"];
  }
  return void 0;
}
async function renderEndpoint(mod, context, ssr) {
  var _a;
  const { request, params } = context;
  const chosenMethod = (_a = request.method) == null ? void 0 : _a.toLowerCase();
  const handler = getHandlerFromModule(mod, chosenMethod);
  if (!ssr && ssr === false && chosenMethod && chosenMethod !== "get") {
    console.warn(`
${chosenMethod} requests are not available when building a static site. Update your config to output: 'server' to handle ${chosenMethod} requests.`);
  }
  if (!handler || typeof handler !== "function") {
    let response = new Response(null, {
      status: 404,
      headers: {
        "X-Astro-Response": "Not-Found"
      }
    });
    return response;
  }
  if (handler.length > 1) {
    console.warn(`
API routes with 2 arguments have been deprecated. Instead they take a single argument in the form of:

export function get({ params, request }) {
	//...
}

Update your code to remove this warning.`);
  }
  const proxy = new Proxy(context, {
    get(target, prop) {
      if (prop in target) {
        return Reflect.get(target, prop);
      } else if (prop in params) {
        console.warn(`
API routes no longer pass params as the first argument. Instead an object containing a params property is provided in the form of:

export function get({ params }) {
	// ...
}

Update your code to remove this warning.`);
        return Reflect.get(params, prop);
      } else {
        return void 0;
      }
    }
  });
  return handler.call(mod, proxy, request);
}
var { replace } = "";
var ca = /[&<>'"]/g;
var esca = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&#39;",
  '"': "&quot;"
};
var pe = (m) => esca[m];
var escape = (es) => replace.call(es, ca, pe);
var escapeHTML = escape;
var HTMLString = class extends String {
  get [Symbol.toStringTag]() {
    return "HTMLString";
  }
};
var markHTMLString = (value) => {
  if (value instanceof HTMLString) {
    return value;
  }
  if (typeof value === "string") {
    return new HTMLString(value);
  }
  return value;
};
function isHTMLString(value) {
  return Object.prototype.toString.call(value) === "[object HTMLString]";
}
var Metadata = class {
  constructor(filePathname, opts) {
    this.modules = opts.modules;
    this.hoisted = opts.hoisted;
    this.hydratedComponents = opts.hydratedComponents;
    this.clientOnlyComponents = opts.clientOnlyComponents;
    this.hydrationDirectives = opts.hydrationDirectives;
    this.mockURL = new URL(filePathname, "http://example.com");
    this.metadataCache = /* @__PURE__ */ new Map();
  }
  resolvePath(specifier) {
    if (specifier.startsWith(".")) {
      const resolved = new URL(specifier, this.mockURL).pathname;
      if (resolved.startsWith("/@fs") && resolved.endsWith(".jsx")) {
        return resolved.slice(0, resolved.length - 4);
      }
      return resolved;
    }
    return specifier;
  }
  getPath(Component) {
    const metadata = this.getComponentMetadata(Component);
    return (metadata == null ? void 0 : metadata.componentUrl) || null;
  }
  getExport(Component) {
    const metadata = this.getComponentMetadata(Component);
    return (metadata == null ? void 0 : metadata.componentExport) || null;
  }
  getComponentMetadata(Component) {
    if (this.metadataCache.has(Component)) {
      return this.metadataCache.get(Component);
    }
    const metadata = this.findComponentMetadata(Component);
    this.metadataCache.set(Component, metadata);
    return metadata;
  }
  findComponentMetadata(Component) {
    const isCustomElement = typeof Component === "string";
    for (const { module, specifier } of this.modules) {
      const id = this.resolvePath(specifier);
      for (const [key, value] of Object.entries(module)) {
        if (isCustomElement) {
          if (key === "tagName" && Component === value) {
            return {
              componentExport: key,
              componentUrl: id
            };
          }
        } else if (Component === value) {
          return {
            componentExport: key,
            componentUrl: id
          };
        }
      }
    }
    return null;
  }
};
function createMetadata(filePathname, options) {
  return new Metadata(filePathname, options);
}
var PROP_TYPE = {
  Value: 0,
  JSON: 1,
  RegExp: 2,
  Date: 3,
  Map: 4,
  Set: 5,
  BigInt: 6,
  URL: 7,
  Uint8Array: 8,
  Uint16Array: 9,
  Uint32Array: 10
};
function serializeArray(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = value.map((v) => {
    return convertToSerializedForm(v, metadata, parents);
  });
  parents.delete(value);
  return serialized;
}
function serializeObject(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = Object.fromEntries(
    Object.entries(value).map(([k, v]) => {
      return [k, convertToSerializedForm(v, metadata, parents)];
    })
  );
  parents.delete(value);
  return serialized;
}
function convertToSerializedForm(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  const tag = Object.prototype.toString.call(value);
  switch (tag) {
    case "[object Date]": {
      return [PROP_TYPE.Date, value.toISOString()];
    }
    case "[object RegExp]": {
      return [PROP_TYPE.RegExp, value.source];
    }
    case "[object Map]": {
      return [
        PROP_TYPE.Map,
        JSON.stringify(serializeArray(Array.from(value), metadata, parents))
      ];
    }
    case "[object Set]": {
      return [
        PROP_TYPE.Set,
        JSON.stringify(serializeArray(Array.from(value), metadata, parents))
      ];
    }
    case "[object BigInt]": {
      return [PROP_TYPE.BigInt, value.toString()];
    }
    case "[object URL]": {
      return [PROP_TYPE.URL, value.toString()];
    }
    case "[object Array]": {
      return [PROP_TYPE.JSON, JSON.stringify(serializeArray(value, metadata, parents))];
    }
    case "[object Uint8Array]": {
      return [PROP_TYPE.Uint8Array, JSON.stringify(Array.from(value))];
    }
    case "[object Uint16Array]": {
      return [PROP_TYPE.Uint16Array, JSON.stringify(Array.from(value))];
    }
    case "[object Uint32Array]": {
      return [PROP_TYPE.Uint32Array, JSON.stringify(Array.from(value))];
    }
    default: {
      if (value !== null && typeof value === "object") {
        return [PROP_TYPE.Value, serializeObject(value, metadata, parents)];
      } else {
        return [PROP_TYPE.Value, value];
      }
    }
  }
}
function serializeProps(props, metadata) {
  const serialized = JSON.stringify(serializeObject(props, metadata));
  return serialized;
}
function serializeListValue(value) {
  const hash = {};
  push(value);
  return Object.keys(hash).join(" ");
  function push(item) {
    if (item && typeof item.forEach === "function")
      item.forEach(push);
    else if (item === Object(item))
      Object.keys(item).forEach((name) => {
        if (item[name])
          push(name);
      });
    else {
      item = item === false || item == null ? "" : String(item).trim();
      if (item) {
        item.split(/\s+/).forEach((name) => {
          hash[name] = true;
        });
      }
    }
  }
}
var HydrationDirectivesRaw = ["load", "idle", "media", "visible", "only"];
var HydrationDirectives = new Set(HydrationDirectivesRaw);
var HydrationDirectiveProps = new Set(HydrationDirectivesRaw.map((n) => `client:${n}`));
function extractDirectives(inputProps) {
  let extracted = {
    isPage: false,
    hydration: null,
    props: {}
  };
  for (const [key, value] of Object.entries(inputProps)) {
    if (key.startsWith("server:")) {
      if (key === "server:root") {
        extracted.isPage = true;
      }
    }
    if (key.startsWith("client:")) {
      if (!extracted.hydration) {
        extracted.hydration = {
          directive: "",
          value: "",
          componentUrl: "",
          componentExport: { value: "" }
        };
      }
      switch (key) {
        case "client:component-path": {
          extracted.hydration.componentUrl = value;
          break;
        }
        case "client:component-export": {
          extracted.hydration.componentExport.value = value;
          break;
        }
        case "client:component-hydration": {
          break;
        }
        case "client:display-name": {
          break;
        }
        default: {
          extracted.hydration.directive = key.split(":")[1];
          extracted.hydration.value = value;
          if (!HydrationDirectives.has(extracted.hydration.directive)) {
            throw new Error(
              `Error: invalid hydration directive "${key}". Supported hydration methods: ${Array.from(
                HydrationDirectiveProps
              ).join(", ")}`
            );
          }
          if (extracted.hydration.directive === "media" && typeof extracted.hydration.value !== "string") {
            throw new Error(
              'Error: Media query must be provided for "client:media", similar to client:media="(max-width: 600px)"'
            );
          }
          break;
        }
      }
    } else if (key === "class:list") {
      if (value) {
        extracted.props[key.slice(0, -5)] = serializeListValue(value);
      }
    } else {
      extracted.props[key] = value;
    }
  }
  return extracted;
}
async function generateHydrateScript(scriptOptions, metadata) {
  const { renderer, result, astroId, props, attrs } = scriptOptions;
  const { hydrate, componentUrl, componentExport } = metadata;
  if (!componentExport.value) {
    throw new Error(
      `Unable to resolve a valid export for "${metadata.displayName}"! Please open an issue at https://astro.build/issues!`
    );
  }
  const island = {
    children: "",
    props: {
      uid: astroId
    }
  };
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      island.props[key] = value;
    }
  }
  island.props["component-url"] = await result.resolve(decodeURI(componentUrl));
  if (renderer.clientEntrypoint) {
    island.props["component-export"] = componentExport.value;
    island.props["renderer-url"] = await result.resolve(decodeURI(renderer.clientEntrypoint));
    island.props["props"] = escapeHTML(serializeProps(props, metadata));
  }
  island.props["ssr"] = "";
  island.props["client"] = hydrate;
  let beforeHydrationUrl = await result.resolve("astro:scripts/before-hydration.js");
  if (beforeHydrationUrl.length) {
    island.props["before-hydration-url"] = beforeHydrationUrl;
  }
  island.props["opts"] = escapeHTML(
    JSON.stringify({
      name: metadata.displayName,
      value: metadata.hydrateArgs || ""
    })
  );
  return island;
}
var SlotString = class extends HTMLString {
  constructor(content, instructions) {
    super(content);
    this.instructions = instructions;
  }
};
async function renderSlot(_result2, slotted, fallback) {
  if (slotted) {
    let iterator = renderChild(slotted);
    let content = "";
    let instructions = null;
    for await (const chunk of iterator) {
      if (chunk.type === "directive") {
        if (instructions === null) {
          instructions = [];
        }
        instructions.push(chunk);
      } else {
        content += chunk;
      }
    }
    return markHTMLString(new SlotString(content, instructions));
  }
  return fallback;
}
async function renderSlots(result, slots = {}) {
  let slotInstructions = null;
  let children = {};
  if (slots) {
    await Promise.all(
      Object.entries(slots).map(
        ([key, value]) => renderSlot(result, value).then((output) => {
          if (output.instructions) {
            if (slotInstructions === null) {
              slotInstructions = [];
            }
            slotInstructions.push(...output.instructions);
          }
          children[key] = output;
        })
      )
    );
  }
  return { slotInstructions, children };
}
async function* renderChild(child) {
  child = await child;
  if (child instanceof SlotString) {
    if (child.instructions) {
      yield* child.instructions;
    }
    yield child;
  } else if (child instanceof HTMLString) {
    yield child;
  } else if (Array.isArray(child)) {
    for (const value of child) {
      yield markHTMLString(await renderChild(value));
    }
  } else if (typeof child === "function") {
    yield* renderChild(child());
  } else if (typeof child === "string") {
    yield markHTMLString(escapeHTML(child));
  } else if (!child && child !== 0)
    ;
  else if (child instanceof AstroComponent || Object.prototype.toString.call(child) === "[object AstroComponent]") {
    yield* renderAstroComponent(child);
  } else if (ArrayBuffer.isView(child)) {
    yield child;
  } else if (typeof child === "object" && (Symbol.asyncIterator in child || Symbol.iterator in child)) {
    yield* child;
  } else {
    yield child;
  }
}
var idle_prebuilt_default = `(self.Astro=self.Astro||{}).idle=t=>{const e=async()=>{await(await t())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)},window.dispatchEvent(new Event("astro:idle"));`;
var load_prebuilt_default = `(self.Astro=self.Astro||{}).load=a=>{(async()=>await(await a())())()},window.dispatchEvent(new Event("astro:load"));`;
var media_prebuilt_default = `(self.Astro=self.Astro||{}).media=(s,a)=>{const t=async()=>{await(await s())()};if(a.value){const e=matchMedia(a.value);e.matches?t():e.addEventListener("change",t,{once:!0})}},window.dispatchEvent(new Event("astro:media"));`;
var only_prebuilt_default = `(self.Astro=self.Astro||{}).only=t=>{(async()=>await(await t())())()},window.dispatchEvent(new Event("astro:only"));`;
var visible_prebuilt_default = `(self.Astro=self.Astro||{}).visible=(s,c,n)=>{const r=async()=>{await(await s())()};let i=new IntersectionObserver(e=>{for(const t of e)if(!!t.isIntersecting){i.disconnect(),r();break}});for(let e=0;e<n.children.length;e++){const t=n.children[e];i.observe(t)}},window.dispatchEvent(new Event("astro:visible"));`;
var astro_island_prebuilt_default = `var l;{const c={0:t=>t,1:t=>JSON.parse(t,o),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(JSON.parse(t,o)),5:t=>new Set(JSON.parse(t,o)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(JSON.parse(t)),9:t=>new Uint16Array(JSON.parse(t)),10:t=>new Uint32Array(JSON.parse(t))},o=(t,s)=>{if(t===""||!Array.isArray(s))return s;const[e,n]=s;return e in c?c[e](n):void 0};customElements.get("astro-island")||customElements.define("astro-island",(l=class extends HTMLElement{constructor(){super(...arguments);this.hydrate=()=>{if(!this.hydrator||this.parentElement&&this.parentElement.closest("astro-island[ssr]"))return;const s=this.querySelectorAll("astro-slot"),e={},n=this.querySelectorAll("template[data-astro-template]");for(const r of n){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("data-astro-template")||"default"]=r.innerHTML,r.remove())}for(const r of s){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("name")||"default"]=r.innerHTML)}const a=this.hasAttribute("props")?JSON.parse(this.getAttribute("props"),o):{};this.hydrator(this)(this.Component,a,e,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),window.removeEventListener("astro:hydrate",this.hydrate),window.dispatchEvent(new CustomEvent("astro:hydrate"))}}connectedCallback(){!this.hasAttribute("await-children")||this.firstChild?this.childrenConnectedCallback():new MutationObserver((s,e)=>{e.disconnect(),this.childrenConnectedCallback()}).observe(this,{childList:!0})}async childrenConnectedCallback(){window.addEventListener("astro:hydrate",this.hydrate);let s=this.getAttribute("before-hydration-url");s&&await import(s),this.start()}start(){const s=JSON.parse(this.getAttribute("opts")),e=this.getAttribute("client");if(Astro[e]===void 0){window.addEventListener(\`astro:\${e}\`,()=>this.start(),{once:!0});return}Astro[e](async()=>{const n=this.getAttribute("renderer-url"),[a,{default:r}]=await Promise.all([import(this.getAttribute("component-url")),n?import(n):()=>()=>{}]),i=this.getAttribute("component-export")||"default";if(!i.includes("."))this.Component=a[i];else{this.Component=a;for(const d of i.split("."))this.Component=this.Component[d]}return this.hydrator=r,this.hydrate},s,this)}attributeChangedCallback(){this.hydrator&&this.hydrate()}},l.observedAttributes=["props"],l))}`;
function determineIfNeedsHydrationScript(result) {
  if (result._metadata.hasHydrationScript) {
    return false;
  }
  return result._metadata.hasHydrationScript = true;
}
var hydrationScripts = {
  idle: idle_prebuilt_default,
  load: load_prebuilt_default,
  only: only_prebuilt_default,
  media: media_prebuilt_default,
  visible: visible_prebuilt_default
};
function determinesIfNeedsDirectiveScript(result, directive) {
  if (result._metadata.hasDirectives.has(directive)) {
    return false;
  }
  result._metadata.hasDirectives.add(directive);
  return true;
}
function getDirectiveScriptText(directive) {
  if (!(directive in hydrationScripts)) {
    throw new Error(`Unknown directive: ${directive}`);
  }
  const directiveScriptText = hydrationScripts[directive];
  return directiveScriptText;
}
function getPrescripts(type, directive) {
  switch (type) {
    case "both":
      return `<style>astro-island,astro-slot{display:contents}</style><script>${getDirectiveScriptText(directive) + astro_island_prebuilt_default}<\/script>`;
    case "directive":
      return `<script>${getDirectiveScriptText(directive)}<\/script>`;
  }
  return "";
}
var Fragment = Symbol.for("astro:fragment");
var Renderer = Symbol.for("astro:renderer");
var encoder = new TextEncoder();
var decoder = new TextDecoder();
function stringifyChunk(result, chunk) {
  switch (chunk.type) {
    case "directive": {
      const { hydration } = chunk;
      let needsHydrationScript = hydration && determineIfNeedsHydrationScript(result);
      let needsDirectiveScript = hydration && determinesIfNeedsDirectiveScript(result, hydration.directive);
      let prescriptType = needsHydrationScript ? "both" : needsDirectiveScript ? "directive" : null;
      if (prescriptType) {
        let prescripts = getPrescripts(prescriptType, hydration.directive);
        return markHTMLString(prescripts);
      } else {
        return "";
      }
    }
    default: {
      return chunk.toString();
    }
  }
}
var HTMLParts = class {
  constructor() {
    this.parts = [];
  }
  append(part, result) {
    if (ArrayBuffer.isView(part)) {
      this.parts.push(part);
    } else {
      this.parts.push(stringifyChunk(result, part));
    }
  }
  toString() {
    let html2 = "";
    for (const part of this.parts) {
      if (ArrayBuffer.isView(part)) {
        html2 += decoder.decode(part);
      } else {
        html2 += part;
      }
    }
    return html2;
  }
  toArrayBuffer() {
    this.parts.forEach((part, i) => {
      if (!ArrayBuffer.isView(part)) {
        this.parts[i] = encoder.encode(String(part));
      }
    });
    return concatUint8Arrays(this.parts);
  }
};
function chunkToByteArray(result, chunk) {
  if (chunk instanceof Uint8Array) {
    return chunk;
  }
  return encoder.encode(stringifyChunk(result, chunk));
}
function concatUint8Arrays(arrays) {
  let len = 0;
  arrays.forEach((arr) => len += arr.length);
  let merged = new Uint8Array(len);
  let offset = 0;
  arrays.forEach((arr) => {
    merged.set(arr, offset);
    offset += arr.length;
  });
  return merged;
}
function validateComponentProps(props, displayName) {
  var _a;
  if (((_a = { "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true }) == null ? void 0 : _a.DEV) && props != null) {
    for (const prop of Object.keys(props)) {
      if (HydrationDirectiveProps.has(prop)) {
        console.warn(
          `You are attempting to render <${displayName} ${prop} />, but ${displayName} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`
        );
      }
    }
  }
}
var AstroComponent = class {
  constructor(htmlParts, expressions) {
    this.htmlParts = htmlParts;
    this.expressions = expressions;
  }
  get [Symbol.toStringTag]() {
    return "AstroComponent";
  }
  async *[Symbol.asyncIterator]() {
    const { htmlParts, expressions } = this;
    for (let i = 0; i < htmlParts.length; i++) {
      const html2 = htmlParts[i];
      const expression = expressions[i];
      yield markHTMLString(html2);
      yield* renderChild(expression);
    }
  }
};
function isAstroComponent(obj) {
  return typeof obj === "object" && Object.prototype.toString.call(obj) === "[object AstroComponent]";
}
function isAstroComponentFactory(obj) {
  return obj == null ? false : !!obj.isAstroComponentFactory;
}
async function* renderAstroComponent(component) {
  for await (const value of component) {
    if (value || value === 0) {
      for await (const chunk of renderChild(value)) {
        switch (chunk.type) {
          case "directive": {
            yield chunk;
            break;
          }
          default: {
            yield markHTMLString(chunk);
            break;
          }
        }
      }
    }
  }
}
async function renderToString(result, componentFactory, props, children) {
  const Component = await componentFactory(result, props, children);
  if (!isAstroComponent(Component)) {
    const response = Component;
    throw response;
  }
  let parts = new HTMLParts();
  for await (const chunk of renderAstroComponent(Component)) {
    parts.append(chunk, result);
  }
  return parts.toString();
}
async function renderToIterable(result, componentFactory, displayName, props, children) {
  validateComponentProps(props, displayName);
  const Component = await componentFactory(result, props, children);
  if (!isAstroComponent(Component)) {
    console.warn(
      `Returning a Response is only supported inside of page components. Consider refactoring this logic into something like a function that can be used in the page.`
    );
    const response = Component;
    throw response;
  }
  return renderAstroComponent(Component);
}
async function renderTemplate(htmlParts, ...expressions) {
  return new AstroComponent(htmlParts, expressions);
}
var dictionary = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
var binary = dictionary.length;
function bitwise(str) {
  let hash = 0;
  if (str.length === 0)
    return hash;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}
function shorthash(text) {
  let num;
  let result = "";
  let integer = bitwise(text);
  const sign = integer < 0 ? "Z" : "";
  integer = Math.abs(integer);
  while (integer >= binary) {
    num = integer % binary;
    integer = Math.floor(integer / binary);
    result = dictionary[num] + result;
  }
  if (integer > 0) {
    result = dictionary[integer] + result;
  }
  return sign + result;
}
var voidElementNames = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
var htmlBooleanAttributes = /^(allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i;
var htmlEnumAttributes = /^(contenteditable|draggable|spellcheck|value)$/i;
var svgEnumAttributes = /^(autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i;
var STATIC_DIRECTIVES = /* @__PURE__ */ new Set(["set:html", "set:text"]);
var toIdent = (k) => k.trim().replace(/(?:(?!^)\b\w|\s+|[^\w]+)/g, (match, index) => {
  if (/[^\w]|\s/.test(match))
    return "";
  return index === 0 ? match : match.toUpperCase();
});
var toAttributeString = (value, shouldEscape = true) => shouldEscape ? String(value).replace(/&/g, "&#38;").replace(/"/g, "&#34;") : value;
var kebab = (k) => k.toLowerCase() === k ? k : k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
var toStyleString = (obj) => Object.entries(obj).map(([k, v]) => `${kebab(k)}:${v}`).join(";");
function defineScriptVars(vars) {
  let output = "";
  for (const [key, value] of Object.entries(vars)) {
    output += `const ${toIdent(key)} = ${JSON.stringify(value)};
`;
  }
  return markHTMLString(output);
}
function formatList(values) {
  if (values.length === 1) {
    return values[0];
  }
  return `${values.slice(0, -1).join(", ")} or ${values[values.length - 1]}`;
}
function addAttribute(value, key, shouldEscape = true) {
  if (value == null) {
    return "";
  }
  if (value === false) {
    if (htmlEnumAttributes.test(key) || svgEnumAttributes.test(key)) {
      return markHTMLString(` ${key}="false"`);
    }
    return "";
  }
  if (STATIC_DIRECTIVES.has(key)) {
    console.warn(`[astro] The "${key}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${key}={value}\`) instead of the dynamic spread syntax (\`{...{ "${key}": value }}\`).`);
    return "";
  }
  if (key === "class:list") {
    const listValue = toAttributeString(serializeListValue(value));
    if (listValue === "") {
      return "";
    }
    return markHTMLString(` ${key.slice(0, -5)}="${listValue}"`);
  }
  if (key === "style" && !(value instanceof HTMLString) && typeof value === "object") {
    return markHTMLString(` ${key}="${toStyleString(value)}"`);
  }
  if (key === "className") {
    return markHTMLString(` class="${toAttributeString(value, shouldEscape)}"`);
  }
  if (value === true && (key.startsWith("data-") || htmlBooleanAttributes.test(key))) {
    return markHTMLString(` ${key}`);
  } else {
    return markHTMLString(` ${key}="${toAttributeString(value, shouldEscape)}"`);
  }
}
function internalSpreadAttributes(values, shouldEscape = true) {
  let output = "";
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, shouldEscape);
  }
  return markHTMLString(output);
}
function renderElement$1(name, { props: _props, children = "" }, shouldEscape = true) {
  const { lang: _, "data-astro-id": astroId, "define:vars": defineVars, ...props } = _props;
  if (defineVars) {
    if (name === "style") {
      delete props["is:global"];
      delete props["is:scoped"];
    }
    if (name === "script") {
      delete props.hoist;
      children = defineScriptVars(defineVars) + "\n" + children;
    }
  }
  if ((children == null || children == "") && voidElementNames.test(name)) {
    return `<${name}${internalSpreadAttributes(props, shouldEscape)} />`;
  }
  return `<${name}${internalSpreadAttributes(props, shouldEscape)}>${children}</${name}>`;
}
function componentIsHTMLElement(Component) {
  return typeof HTMLElement !== "undefined" && HTMLElement.isPrototypeOf(Component);
}
async function renderHTMLElement(result, constructor, props, slots) {
  const name = getHTMLElementName(constructor);
  let attrHTML = "";
  for (const attr in props) {
    attrHTML += ` ${attr}="${toAttributeString(await props[attr])}"`;
  }
  return markHTMLString(
    `<${name}${attrHTML}>${await renderSlot(result, slots == null ? void 0 : slots.default)}</${name}>`
  );
}
function getHTMLElementName(constructor) {
  const definedName = customElements.getName(constructor);
  if (definedName)
    return definedName;
  const assignedName = constructor.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
  return assignedName;
}
var rendererAliases = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
function guessRenderers(componentUrl) {
  const extname2 = componentUrl == null ? void 0 : componentUrl.split(".").pop();
  switch (extname2) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/vue (jsx)"];
    default:
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/vue", "@astrojs/svelte"];
  }
}
function getComponentType(Component) {
  if (Component === Fragment) {
    return "fragment";
  }
  if (Component && typeof Component === "object" && Component["astro:html"]) {
    return "html";
  }
  if (isAstroComponentFactory(Component)) {
    return "astro-factory";
  }
  return "unknown";
}
async function renderComponent(result, displayName, Component, _props, slots = {}) {
  var _a;
  Component = await Component;
  switch (getComponentType(Component)) {
    case "fragment": {
      const children2 = await renderSlot(result, slots == null ? void 0 : slots.default);
      if (children2 == null) {
        return children2;
      }
      return markHTMLString(children2);
    }
    case "html": {
      const { slotInstructions: slotInstructions2, children: children2 } = await renderSlots(result, slots);
      const html22 = Component.render({ slots: children2 });
      const hydrationHtml = slotInstructions2 ? slotInstructions2.map((instr) => stringifyChunk(result, instr)).join("") : "";
      return markHTMLString(hydrationHtml + html22);
    }
    case "astro-factory": {
      async function* renderAstroComponentInline() {
        let iterable = await renderToIterable(result, Component, displayName, _props, slots);
        yield* iterable;
      }
      return renderAstroComponentInline();
    }
  }
  if (!Component && !_props["client:only"]) {
    throw new Error(
      `Unable to render ${displayName} because it is ${Component}!
Did you forget to import the component or is it possible there is a typo?`
    );
  }
  const { renderers: renderers2 } = result._metadata;
  const metadata = { displayName };
  const { hydration, isPage, props } = extractDirectives(_props);
  let html2 = "";
  let attrs = void 0;
  if (hydration) {
    metadata.hydrate = hydration.directive;
    metadata.hydrateArgs = hydration.value;
    metadata.componentExport = hydration.componentExport;
    metadata.componentUrl = hydration.componentUrl;
  }
  const probableRendererNames = guessRenderers(metadata.componentUrl);
  if (Array.isArray(renderers2) && renderers2.length === 0 && typeof Component !== "string" && !componentIsHTMLElement(Component)) {
    const message = `Unable to render ${metadata.displayName}!

There are no \`integrations\` set in your \`astro.config.mjs\` file.
Did you mean to add ${formatList(probableRendererNames.map((r) => "`" + r + "`"))}?`;
    throw new Error(message);
  }
  const { children, slotInstructions } = await renderSlots(result, slots);
  let renderer;
  if (metadata.hydrate !== "only") {
    if (Component && Component[Renderer]) {
      const rendererName = Component[Renderer];
      renderer = renderers2.find(({ name }) => name === rendererName);
    }
    if (!renderer) {
      let error2;
      for (const r of renderers2) {
        try {
          if (await r.ssr.check.call({ result }, Component, props, children)) {
            renderer = r;
            break;
          }
        } catch (e) {
          error2 ?? (error2 = e);
        }
      }
      if (!renderer && error2) {
        throw error2;
      }
    }
    if (!renderer && typeof HTMLElement === "function" && componentIsHTMLElement(Component)) {
      const output = renderHTMLElement(result, Component, _props, slots);
      return output;
    }
  } else {
    if (metadata.hydrateArgs) {
      const passedName = metadata.hydrateArgs;
      const rendererName = rendererAliases.has(passedName) ? rendererAliases.get(passedName) : passedName;
      renderer = renderers2.find(
        ({ name }) => name === `@astrojs/${rendererName}` || name === rendererName
      );
    }
    if (!renderer && renderers2.length === 1) {
      renderer = renderers2[0];
    }
    if (!renderer) {
      const extname2 = (_a = metadata.componentUrl) == null ? void 0 : _a.split(".").pop();
      renderer = renderers2.filter(
        ({ name }) => name === `@astrojs/${extname2}` || name === extname2
      )[0];
    }
  }
  if (!renderer) {
    if (metadata.hydrate === "only") {
      throw new Error(`Unable to render ${metadata.displayName}!

Using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.
Did you mean to pass <${metadata.displayName} client:only="${probableRendererNames.map((r) => r.replace("@astrojs/", "")).join("|")}" />
`);
    } else if (typeof Component !== "string") {
      const matchingRenderers = renderers2.filter((r) => probableRendererNames.includes(r.name));
      const plural = renderers2.length > 1;
      if (matchingRenderers.length === 0) {
        throw new Error(`Unable to render ${metadata.displayName}!

There ${plural ? "are" : "is"} ${renderers2.length} renderer${plural ? "s" : ""} configured in your \`astro.config.mjs\` file,
but ${plural ? "none were" : "it was not"} able to server-side render ${metadata.displayName}.

Did you mean to enable ${formatList(probableRendererNames.map((r) => "`" + r + "`"))}?`);
      } else if (matchingRenderers.length === 1) {
        renderer = matchingRenderers[0];
        ({ html: html2, attrs } = await renderer.ssr.renderToStaticMarkup.call(
          { result },
          Component,
          props,
          children,
          metadata
        ));
      } else {
        throw new Error(`Unable to render ${metadata.displayName}!

This component likely uses ${formatList(probableRendererNames)},
but Astro encountered an error during server-side rendering.

Please ensure that ${metadata.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
      }
    }
  } else {
    if (metadata.hydrate === "only") {
      html2 = await renderSlot(result, slots == null ? void 0 : slots.fallback);
    } else {
      ({ html: html2, attrs } = await renderer.ssr.renderToStaticMarkup.call(
        { result },
        Component,
        props,
        children,
        metadata
      ));
    }
  }
  if (renderer && !renderer.clientEntrypoint && renderer.name !== "@astrojs/lit" && metadata.hydrate) {
    throw new Error(
      `${metadata.displayName} component has a \`client:${metadata.hydrate}\` directive, but no client entrypoint was provided by ${renderer.name}!`
    );
  }
  if (!html2 && typeof Component === "string") {
    const childSlots = Object.values(children).join("");
    const iterable = renderAstroComponent(
      await renderTemplate`<${Component}${internalSpreadAttributes(props)}${markHTMLString(
        childSlots === "" && voidElementNames.test(Component) ? `/>` : `>${childSlots}</${Component}>`
      )}`
    );
    html2 = "";
    for await (const chunk of iterable) {
      html2 += chunk;
    }
  }
  if (!hydration) {
    if (isPage || (renderer == null ? void 0 : renderer.name) === "astro:jsx") {
      return html2;
    }
    return markHTMLString(html2.replace(/\<\/?astro-slot\>/g, ""));
  }
  const astroId = shorthash(
    `<!--${metadata.componentExport.value}:${metadata.componentUrl}-->
${html2}
${serializeProps(
      props,
      metadata
    )}`
  );
  const island = await generateHydrateScript(
    { renderer, result, astroId, props, attrs },
    metadata
  );
  let unrenderedSlots = [];
  if (html2) {
    if (Object.keys(children).length > 0) {
      for (const key of Object.keys(children)) {
        if (!html2.includes(key === "default" ? `<astro-slot>` : `<astro-slot name="${key}">`)) {
          unrenderedSlots.push(key);
        }
      }
    }
  } else {
    unrenderedSlots = Object.keys(children);
  }
  const template = unrenderedSlots.length > 0 ? unrenderedSlots.map(
    (key) => `<template data-astro-template${key !== "default" ? `="${key}"` : ""}>${children[key]}</template>`
  ).join("") : "";
  island.children = `${html2 ?? ""}${template}`;
  if (island.children) {
    island.props["await-children"] = "";
  }
  async function* renderAll() {
    if (slotInstructions) {
      yield* slotInstructions;
    }
    yield { type: "directive", hydration, result };
    yield markHTMLString(renderElement$1("astro-island", island, false));
  }
  return renderAll();
}
var uniqueElements = (item, index, all) => {
  const props = JSON.stringify(item.props);
  const children = item.children;
  return index === all.findIndex((i) => JSON.stringify(i.props) === props && i.children == children);
};
function renderHead(result) {
  result._metadata.hasRenderedHead = true;
  const styles = Array.from(result.styles).filter(uniqueElements).map((style) => renderElement$1("style", style));
  result.styles.clear();
  const scripts = Array.from(result.scripts).filter(uniqueElements).map((script, i) => {
    return renderElement$1("script", script, false);
  });
  const links = Array.from(result.links).filter(uniqueElements).map((link) => renderElement$1("link", link, false));
  return markHTMLString(links.join("\n") + styles.join("\n") + scripts.join("\n"));
}
async function* maybeRenderHead(result) {
  if (result._metadata.hasRenderedHead) {
    return;
  }
  yield renderHead(result);
}
var __accessCheck$2 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$2 = (obj, member, getter) => {
  __accessCheck$2(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$2 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$2 = (obj, member, value, setter) => {
  __accessCheck$2(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var isNodeJS = typeof process === "object" && Object.prototype.toString.call(process) === "[object process]";
var StreamingCompatibleResponse;
function createResponseClass() {
  var _isStream, _body, _a;
  StreamingCompatibleResponse = (_a = class extends Response {
    constructor(body, init2) {
      let isStream = body instanceof ReadableStream;
      super(isStream ? null : body, init2);
      __privateAdd$2(this, _isStream, void 0);
      __privateAdd$2(this, _body, void 0);
      __privateSet$2(this, _isStream, isStream);
      __privateSet$2(this, _body, body);
    }
    get body() {
      return __privateGet$2(this, _body);
    }
    async text() {
      if (__privateGet$2(this, _isStream) && isNodeJS) {
        let decoder2 = new TextDecoder();
        let body = __privateGet$2(this, _body);
        let out = "";
        for await (let chunk of body) {
          out += decoder2.decode(chunk);
        }
        return out;
      }
      return super.text();
    }
    async arrayBuffer() {
      if (__privateGet$2(this, _isStream) && isNodeJS) {
        let body = __privateGet$2(this, _body);
        let chunks = [];
        let len = 0;
        for await (let chunk of body) {
          chunks.push(chunk);
          len += chunk.length;
        }
        let ab = new Uint8Array(len);
        let offset = 0;
        for (const chunk of chunks) {
          ab.set(chunk, offset);
          offset += chunk.length;
        }
        return ab;
      }
      return super.arrayBuffer();
    }
  }, _isStream = /* @__PURE__ */ new WeakMap(), _body = /* @__PURE__ */ new WeakMap(), _a);
  return StreamingCompatibleResponse;
}
var createResponse = isNodeJS ? (body, init2) => {
  if (typeof body === "string" || ArrayBuffer.isView(body)) {
    return new Response(body, init2);
  }
  if (typeof StreamingCompatibleResponse === "undefined") {
    return new (createResponseClass())(body, init2);
  }
  return new StreamingCompatibleResponse(body, init2);
} : (body, init2) => new Response(body, init2);
var needsHeadRenderingSymbol = Symbol.for("astro.needsHeadRendering");
function nonAstroPageNeedsHeadInjection(pageComponent) {
  return needsHeadRenderingSymbol in pageComponent && !!pageComponent[needsHeadRenderingSymbol];
}
async function renderPage(result, componentFactory, props, children, streaming) {
  if (!isAstroComponentFactory(componentFactory)) {
    const pageProps = { ...props ?? {}, "server:root": true };
    const output = await renderComponent(
      result,
      componentFactory.name,
      componentFactory,
      pageProps,
      null
    );
    let html2 = output.toString();
    if (!/<!doctype html/i.test(html2)) {
      let rest = html2;
      html2 = `<!DOCTYPE html>`;
      if (nonAstroPageNeedsHeadInjection(componentFactory)) {
        for await (let chunk of maybeRenderHead(result)) {
          html2 += chunk;
        }
      }
      html2 += rest;
    }
    const bytes = encoder.encode(html2);
    return new Response(bytes, {
      headers: new Headers([
        ["Content-Type", "text/html; charset=utf-8"],
        ["Content-Length", bytes.byteLength.toString()]
      ])
    });
  }
  const factoryReturnValue = await componentFactory(result, props, children);
  if (isAstroComponent(factoryReturnValue)) {
    let iterable = renderAstroComponent(factoryReturnValue);
    let init2 = result.response;
    let headers = new Headers(init2.headers);
    let body;
    if (streaming) {
      body = new ReadableStream({
        start(controller) {
          async function read() {
            let i = 0;
            try {
              for await (const chunk of iterable) {
                if (isHTMLString(chunk)) {
                  if (i === 0) {
                    if (!/<!doctype html/i.test(String(chunk))) {
                      controller.enqueue(encoder.encode("<!DOCTYPE html>\n"));
                    }
                  }
                }
                let bytes = chunkToByteArray(result, chunk);
                controller.enqueue(bytes);
                i++;
              }
              controller.close();
            } catch (e) {
              controller.error(e);
            }
          }
          read();
        }
      });
    } else {
      let parts = new HTMLParts();
      let i = 0;
      for await (const chunk of iterable) {
        if (isHTMLString(chunk)) {
          if (i === 0) {
            if (!/<!doctype html/i.test(String(chunk))) {
              parts.append("<!DOCTYPE html>\n", result);
            }
          }
        }
        parts.append(chunk, result);
        i++;
      }
      body = parts.toArrayBuffer();
      headers.set("Content-Length", body.byteLength.toString());
    }
    let response = createResponse(body, { ...init2, headers });
    return response;
  }
  if (!(factoryReturnValue instanceof Response)) {
    throw new Error("Only instance of Response can be returned from an Astro file");
  }
  return factoryReturnValue;
}
function createComponent(cb) {
  cb.isAstroComponentFactory = true;
  return cb;
}
function __astro_tag_component__(Component, rendererName) {
  if (!Component)
    return;
  if (typeof Component !== "function")
    return;
  Object.defineProperty(Component, Renderer, {
    value: rendererName,
    enumerable: false,
    writable: false
  });
}
function spreadAttributes(values, _name, { class: scopedClassName } = {}) {
  let output = "";
  if (scopedClassName) {
    if (typeof values.class !== "undefined") {
      values.class += ` ${scopedClassName}`;
    } else if (typeof values["class:list"] !== "undefined") {
      values["class:list"] = [values["class:list"], scopedClassName];
    } else {
      values.class = scopedClassName;
    }
  }
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, true);
  }
  return markHTMLString(output);
}
var FORCE_COLOR;
var NODE_DISABLE_COLORS;
var NO_COLOR;
var TERM;
var isTTY = true;
if (typeof process !== "undefined") {
  ({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
  isTTY = process.stdout && process.stdout.isTTY;
}
var $ = {
  enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY)
};
function init(x, y) {
  let rgx = new RegExp(`\\x1b\\[${y}m`, "g");
  let open = `\x1B[${x}m`, close = `\x1B[${y}m`;
  return function(txt) {
    if (!$.enabled || txt == null)
      return txt;
    return open + (!!~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
  };
}
var reset = init(0, 0);
var bold = init(1, 22);
var dim = init(2, 22);
var red = init(31, 39);
var yellow = init(33, 39);
var cyan = init(36, 39);
var eastasianwidth = { exports: {} };
(function(module) {
  var eaw = {};
  {
    module.exports = eaw;
  }
  eaw.eastAsianWidth = function(character) {
    var x = character.charCodeAt(0);
    var y = character.length == 2 ? character.charCodeAt(1) : 0;
    var codePoint = x;
    if (55296 <= x && x <= 56319 && (56320 <= y && y <= 57343)) {
      x &= 1023;
      y &= 1023;
      codePoint = x << 10 | y;
      codePoint += 65536;
    }
    if (12288 == codePoint || 65281 <= codePoint && codePoint <= 65376 || 65504 <= codePoint && codePoint <= 65510) {
      return "F";
    }
    if (8361 == codePoint || 65377 <= codePoint && codePoint <= 65470 || 65474 <= codePoint && codePoint <= 65479 || 65482 <= codePoint && codePoint <= 65487 || 65490 <= codePoint && codePoint <= 65495 || 65498 <= codePoint && codePoint <= 65500 || 65512 <= codePoint && codePoint <= 65518) {
      return "H";
    }
    if (4352 <= codePoint && codePoint <= 4447 || 4515 <= codePoint && codePoint <= 4519 || 4602 <= codePoint && codePoint <= 4607 || 9001 <= codePoint && codePoint <= 9002 || 11904 <= codePoint && codePoint <= 11929 || 11931 <= codePoint && codePoint <= 12019 || 12032 <= codePoint && codePoint <= 12245 || 12272 <= codePoint && codePoint <= 12283 || 12289 <= codePoint && codePoint <= 12350 || 12353 <= codePoint && codePoint <= 12438 || 12441 <= codePoint && codePoint <= 12543 || 12549 <= codePoint && codePoint <= 12589 || 12593 <= codePoint && codePoint <= 12686 || 12688 <= codePoint && codePoint <= 12730 || 12736 <= codePoint && codePoint <= 12771 || 12784 <= codePoint && codePoint <= 12830 || 12832 <= codePoint && codePoint <= 12871 || 12880 <= codePoint && codePoint <= 13054 || 13056 <= codePoint && codePoint <= 19903 || 19968 <= codePoint && codePoint <= 42124 || 42128 <= codePoint && codePoint <= 42182 || 43360 <= codePoint && codePoint <= 43388 || 44032 <= codePoint && codePoint <= 55203 || 55216 <= codePoint && codePoint <= 55238 || 55243 <= codePoint && codePoint <= 55291 || 63744 <= codePoint && codePoint <= 64255 || 65040 <= codePoint && codePoint <= 65049 || 65072 <= codePoint && codePoint <= 65106 || 65108 <= codePoint && codePoint <= 65126 || 65128 <= codePoint && codePoint <= 65131 || 110592 <= codePoint && codePoint <= 110593 || 127488 <= codePoint && codePoint <= 127490 || 127504 <= codePoint && codePoint <= 127546 || 127552 <= codePoint && codePoint <= 127560 || 127568 <= codePoint && codePoint <= 127569 || 131072 <= codePoint && codePoint <= 194367 || 177984 <= codePoint && codePoint <= 196605 || 196608 <= codePoint && codePoint <= 262141) {
      return "W";
    }
    if (32 <= codePoint && codePoint <= 126 || 162 <= codePoint && codePoint <= 163 || 165 <= codePoint && codePoint <= 166 || 172 == codePoint || 175 == codePoint || 10214 <= codePoint && codePoint <= 10221 || 10629 <= codePoint && codePoint <= 10630) {
      return "Na";
    }
    if (161 == codePoint || 164 == codePoint || 167 <= codePoint && codePoint <= 168 || 170 == codePoint || 173 <= codePoint && codePoint <= 174 || 176 <= codePoint && codePoint <= 180 || 182 <= codePoint && codePoint <= 186 || 188 <= codePoint && codePoint <= 191 || 198 == codePoint || 208 == codePoint || 215 <= codePoint && codePoint <= 216 || 222 <= codePoint && codePoint <= 225 || 230 == codePoint || 232 <= codePoint && codePoint <= 234 || 236 <= codePoint && codePoint <= 237 || 240 == codePoint || 242 <= codePoint && codePoint <= 243 || 247 <= codePoint && codePoint <= 250 || 252 == codePoint || 254 == codePoint || 257 == codePoint || 273 == codePoint || 275 == codePoint || 283 == codePoint || 294 <= codePoint && codePoint <= 295 || 299 == codePoint || 305 <= codePoint && codePoint <= 307 || 312 == codePoint || 319 <= codePoint && codePoint <= 322 || 324 == codePoint || 328 <= codePoint && codePoint <= 331 || 333 == codePoint || 338 <= codePoint && codePoint <= 339 || 358 <= codePoint && codePoint <= 359 || 363 == codePoint || 462 == codePoint || 464 == codePoint || 466 == codePoint || 468 == codePoint || 470 == codePoint || 472 == codePoint || 474 == codePoint || 476 == codePoint || 593 == codePoint || 609 == codePoint || 708 == codePoint || 711 == codePoint || 713 <= codePoint && codePoint <= 715 || 717 == codePoint || 720 == codePoint || 728 <= codePoint && codePoint <= 731 || 733 == codePoint || 735 == codePoint || 768 <= codePoint && codePoint <= 879 || 913 <= codePoint && codePoint <= 929 || 931 <= codePoint && codePoint <= 937 || 945 <= codePoint && codePoint <= 961 || 963 <= codePoint && codePoint <= 969 || 1025 == codePoint || 1040 <= codePoint && codePoint <= 1103 || 1105 == codePoint || 8208 == codePoint || 8211 <= codePoint && codePoint <= 8214 || 8216 <= codePoint && codePoint <= 8217 || 8220 <= codePoint && codePoint <= 8221 || 8224 <= codePoint && codePoint <= 8226 || 8228 <= codePoint && codePoint <= 8231 || 8240 == codePoint || 8242 <= codePoint && codePoint <= 8243 || 8245 == codePoint || 8251 == codePoint || 8254 == codePoint || 8308 == codePoint || 8319 == codePoint || 8321 <= codePoint && codePoint <= 8324 || 8364 == codePoint || 8451 == codePoint || 8453 == codePoint || 8457 == codePoint || 8467 == codePoint || 8470 == codePoint || 8481 <= codePoint && codePoint <= 8482 || 8486 == codePoint || 8491 == codePoint || 8531 <= codePoint && codePoint <= 8532 || 8539 <= codePoint && codePoint <= 8542 || 8544 <= codePoint && codePoint <= 8555 || 8560 <= codePoint && codePoint <= 8569 || 8585 == codePoint || 8592 <= codePoint && codePoint <= 8601 || 8632 <= codePoint && codePoint <= 8633 || 8658 == codePoint || 8660 == codePoint || 8679 == codePoint || 8704 == codePoint || 8706 <= codePoint && codePoint <= 8707 || 8711 <= codePoint && codePoint <= 8712 || 8715 == codePoint || 8719 == codePoint || 8721 == codePoint || 8725 == codePoint || 8730 == codePoint || 8733 <= codePoint && codePoint <= 8736 || 8739 == codePoint || 8741 == codePoint || 8743 <= codePoint && codePoint <= 8748 || 8750 == codePoint || 8756 <= codePoint && codePoint <= 8759 || 8764 <= codePoint && codePoint <= 8765 || 8776 == codePoint || 8780 == codePoint || 8786 == codePoint || 8800 <= codePoint && codePoint <= 8801 || 8804 <= codePoint && codePoint <= 8807 || 8810 <= codePoint && codePoint <= 8811 || 8814 <= codePoint && codePoint <= 8815 || 8834 <= codePoint && codePoint <= 8835 || 8838 <= codePoint && codePoint <= 8839 || 8853 == codePoint || 8857 == codePoint || 8869 == codePoint || 8895 == codePoint || 8978 == codePoint || 9312 <= codePoint && codePoint <= 9449 || 9451 <= codePoint && codePoint <= 9547 || 9552 <= codePoint && codePoint <= 9587 || 9600 <= codePoint && codePoint <= 9615 || 9618 <= codePoint && codePoint <= 9621 || 9632 <= codePoint && codePoint <= 9633 || 9635 <= codePoint && codePoint <= 9641 || 9650 <= codePoint && codePoint <= 9651 || 9654 <= codePoint && codePoint <= 9655 || 9660 <= codePoint && codePoint <= 9661 || 9664 <= codePoint && codePoint <= 9665 || 9670 <= codePoint && codePoint <= 9672 || 9675 == codePoint || 9678 <= codePoint && codePoint <= 9681 || 9698 <= codePoint && codePoint <= 9701 || 9711 == codePoint || 9733 <= codePoint && codePoint <= 9734 || 9737 == codePoint || 9742 <= codePoint && codePoint <= 9743 || 9748 <= codePoint && codePoint <= 9749 || 9756 == codePoint || 9758 == codePoint || 9792 == codePoint || 9794 == codePoint || 9824 <= codePoint && codePoint <= 9825 || 9827 <= codePoint && codePoint <= 9829 || 9831 <= codePoint && codePoint <= 9834 || 9836 <= codePoint && codePoint <= 9837 || 9839 == codePoint || 9886 <= codePoint && codePoint <= 9887 || 9918 <= codePoint && codePoint <= 9919 || 9924 <= codePoint && codePoint <= 9933 || 9935 <= codePoint && codePoint <= 9953 || 9955 == codePoint || 9960 <= codePoint && codePoint <= 9983 || 10045 == codePoint || 10071 == codePoint || 10102 <= codePoint && codePoint <= 10111 || 11093 <= codePoint && codePoint <= 11097 || 12872 <= codePoint && codePoint <= 12879 || 57344 <= codePoint && codePoint <= 63743 || 65024 <= codePoint && codePoint <= 65039 || 65533 == codePoint || 127232 <= codePoint && codePoint <= 127242 || 127248 <= codePoint && codePoint <= 127277 || 127280 <= codePoint && codePoint <= 127337 || 127344 <= codePoint && codePoint <= 127386 || 917760 <= codePoint && codePoint <= 917999 || 983040 <= codePoint && codePoint <= 1048573 || 1048576 <= codePoint && codePoint <= 1114109) {
      return "A";
    }
    return "N";
  };
  eaw.characterLength = function(character) {
    var code = this.eastAsianWidth(character);
    if (code == "F" || code == "W" || code == "A") {
      return 2;
    } else {
      return 1;
    }
  };
  function stringToArray(string) {
    return string.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
  }
  eaw.length = function(string) {
    var characters = stringToArray(string);
    var len = 0;
    for (var i = 0; i < characters.length; i++) {
      len = len + this.characterLength(characters[i]);
    }
    return len;
  };
  eaw.slice = function(text, start2, end) {
    textLen = eaw.length(text);
    start2 = start2 ? start2 : 0;
    end = end ? end : 1;
    if (start2 < 0) {
      start2 = textLen + start2;
    }
    if (end < 0) {
      end = textLen + end;
    }
    var result = "";
    var eawLen = 0;
    var chars = stringToArray(text);
    for (var i = 0; i < chars.length; i++) {
      var char = chars[i];
      var charLen = eaw.length(char);
      if (eawLen >= start2 - (charLen == 2 ? 1 : 0)) {
        if (eawLen + charLen <= end) {
          result += char;
        } else {
          break;
        }
      }
      eawLen += charLen;
    }
    return result;
  };
})(eastasianwidth);
var dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
});
var levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, type, message) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    type,
    level,
    message
  };
  if (levels[logLevel] > levels[level]) {
    return;
  }
  dest.write(event);
}
function warn(opts, type, message) {
  return log(opts, "warn", type, message);
}
function error(opts, type, message) {
  return log(opts, "error", type, message);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
if (typeof process !== "undefined") {
  if (process.argv.includes("--verbose"))
    ;
  else if (process.argv.includes("--silent"))
    ;
  else
    ;
}
var VALID_PARAM_TYPES = ["string", "number", "undefined"];
function validateGetStaticPathsParameter([key, value]) {
  if (!VALID_PARAM_TYPES.includes(typeof value)) {
    throw new Error(
      `[getStaticPaths] invalid route parameter for "${key}". Expected a string or number, received \`${value}\` ("${typeof value}")`
    );
  }
}
function validateDynamicRouteModule(mod, {
  ssr,
  logging
}) {
  if (mod.createCollection) {
    throw new Error(`[createCollection] deprecated. Please use getStaticPaths() instead.`);
  }
  if (ssr && mod.getStaticPaths) {
    warn(logging, "getStaticPaths", 'getStaticPaths() is ignored when "output: server" is set.');
  }
  if (!ssr && !mod.getStaticPaths) {
    throw new Error(
      `[getStaticPaths] getStaticPaths() function is required.
Make sure that you \`export\` a \`getStaticPaths\` function from your dynamic route.
Alternatively, set \`output: "server"\` in your Astro config file to switch to a non-static server build. `
    );
  }
}
function validateGetStaticPathsResult(result, logging) {
  if (!Array.isArray(result)) {
    throw new Error(
      `[getStaticPaths] invalid return value. Expected an array of path objects, but got \`${JSON.stringify(
        result
      )}\`.`
    );
  }
  result.forEach((pathObject) => {
    if (!pathObject.params) {
      warn(
        logging,
        "getStaticPaths",
        `invalid path object. Expected an object with key \`params\`, but got \`${JSON.stringify(
          pathObject
        )}\`. Skipped.`
      );
      return;
    }
    for (const [key, val] of Object.entries(pathObject.params)) {
      if (!(typeof val === "undefined" || typeof val === "string")) {
        warn(
          logging,
          "getStaticPaths",
          `invalid path param: ${key}. A string value was expected, but got \`${JSON.stringify(
            val
          )}\`.`
        );
      }
      if (val === "") {
        warn(
          logging,
          "getStaticPaths",
          `invalid path param: ${key}. \`undefined\` expected for an optional param, but got empty string.`
        );
      }
    }
  });
}
function getParams(array) {
  const fn = (match) => {
    const params = {};
    array.forEach((key, i) => {
      if (key.startsWith("...")) {
        params[key.slice(3)] = match[i + 1] ? decodeURIComponent(match[i + 1]) : void 0;
      } else {
        params[key] = decodeURIComponent(match[i + 1]);
      }
    });
    return params;
  };
  return fn;
}
function stringifyParams(params) {
  const validatedParams = Object.entries(params).reduce((acc, next) => {
    validateGetStaticPathsParameter(next);
    const [key, value] = next;
    acc[key] = typeof value === "undefined" ? void 0 : `${value}`;
    return acc;
  }, {});
  return JSON.stringify(validatedParams, Object.keys(params).sort());
}
var SCRIPT_EXTENSIONS = /* @__PURE__ */ new Set([".js", ".ts"]);
var scriptRe = new RegExp(
  `\\.(${Array.from(SCRIPT_EXTENSIONS).map((s) => s.slice(1)).join("|")})($|\\?)`
);
var isScriptRequest = (request) => scriptRe.test(request);
var STYLE_EXTENSIONS = /* @__PURE__ */ new Set([
  ".css",
  ".pcss",
  ".postcss",
  ".scss",
  ".sass",
  ".styl",
  ".stylus",
  ".less"
]);
var cssRe = new RegExp(
  `\\.(${Array.from(STYLE_EXTENSIONS).map((s) => s.slice(1)).join("|")})($|\\?)`
);
var isCSSRequest = (request) => cssRe.test(request);
var __accessCheck$1 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$1 = (obj, member, getter) => {
  __accessCheck$1(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$1 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$1 = (obj, member, value, setter) => {
  __accessCheck$1(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _cache;
var _result;
var _slots;
var _loggingOpts;
var clientAddressSymbol = Symbol.for("astro.clientAddress");
function onlyAvailableInSSR(name) {
  return function _onlyAvailableInSSR() {
    throw new Error(`Oops, you are trying to use ${name}, which is only available with SSR.`);
  };
}
function getFunctionExpression(slot) {
  var _a;
  if (!slot)
    return;
  if (((_a = slot.expressions) == null ? void 0 : _a.length) !== 1)
    return;
  return slot.expressions[0];
}
var Slots = class {
  constructor(result, slots, logging) {
    __privateAdd$1(this, _cache, /* @__PURE__ */ new Map());
    __privateAdd$1(this, _result, void 0);
    __privateAdd$1(this, _slots, void 0);
    __privateAdd$1(this, _loggingOpts, void 0);
    __privateSet$1(this, _result, result);
    __privateSet$1(this, _slots, slots);
    __privateSet$1(this, _loggingOpts, logging);
    if (slots) {
      for (const key of Object.keys(slots)) {
        if (this[key] !== void 0) {
          throw new Error(
            `Unable to create a slot named "${key}". "${key}" is a reserved slot name!
Please update the name of this slot.`
          );
        }
        Object.defineProperty(this, key, {
          get() {
            return true;
          },
          enumerable: true
        });
      }
    }
  }
  has(name) {
    if (!__privateGet$1(this, _slots))
      return false;
    return Boolean(__privateGet$1(this, _slots)[name]);
  }
  async render(name, args = []) {
    const cacheable = args.length === 0;
    if (!__privateGet$1(this, _slots))
      return void 0;
    if (cacheable && __privateGet$1(this, _cache).has(name)) {
      const result = __privateGet$1(this, _cache).get(name);
      return result;
    }
    if (!this.has(name))
      return void 0;
    if (!cacheable) {
      const component = await __privateGet$1(this, _slots)[name]();
      const expression = getFunctionExpression(component);
      if (!Array.isArray(args)) {
        warn(
          __privateGet$1(this, _loggingOpts),
          "Astro.slots.render",
          `Expected second parameter to be an array, received a ${typeof args}. If you're trying to pass an array as a single argument and getting unexpected results, make sure you're passing your array as a item of an array. Ex: Astro.slots.render('default', [["Hello", "World"]])`
        );
      } else {
        if (expression) {
          const slot = expression(...args);
          return await renderSlot(__privateGet$1(this, _result), slot).then(
            (res) => res != null ? String(res) : res
          );
        }
      }
    }
    const content = await renderSlot(__privateGet$1(this, _result), __privateGet$1(this, _slots)[name]).then(
      (res) => res != null ? String(res) : res
    );
    if (cacheable)
      __privateGet$1(this, _cache).set(name, content);
    return content;
  }
};
_cache = /* @__PURE__ */ new WeakMap();
_result = /* @__PURE__ */ new WeakMap();
_slots = /* @__PURE__ */ new WeakMap();
_loggingOpts = /* @__PURE__ */ new WeakMap();
var renderMarkdown = null;
function createResult(args) {
  const { markdown, params, pathname, props: pageProps, renderers: renderers2, request, resolve: resolve2 } = args;
  const url2 = new URL(request.url);
  const headers = new Headers();
  headers.set("Content-Type", "text/html");
  const response = {
    status: args.status,
    statusText: "OK",
    headers
  };
  Object.defineProperty(response, "headers", {
    value: response.headers,
    enumerable: true,
    writable: false
  });
  let cookies = void 0;
  const result = {
    styles: args.styles ?? /* @__PURE__ */ new Set(),
    scripts: args.scripts ?? /* @__PURE__ */ new Set(),
    links: args.links ?? /* @__PURE__ */ new Set(),
    cookies,
    createAstro(astroGlobal, props, slots) {
      const astroSlots = new Slots(result, slots, args.logging);
      const Astro = {
        __proto__: astroGlobal,
        get clientAddress() {
          if (!(clientAddressSymbol in request)) {
            if (args.adapterName) {
              throw new Error(
                `Astro.clientAddress is not available in the ${args.adapterName} adapter. File an issue with the adapter to add support.`
              );
            } else {
              throw new Error(
                `Astro.clientAddress is not available in your environment. Ensure that you are using an SSR adapter that supports this feature.`
              );
            }
          }
          return Reflect.get(request, clientAddressSymbol);
        },
        get cookies() {
          if (cookies) {
            return cookies;
          }
          cookies = new AstroCookies(request);
          result.cookies = cookies;
          return cookies;
        },
        params,
        props,
        request,
        url: url2,
        redirect: args.ssr ? (path) => {
          return new Response(null, {
            status: 302,
            headers: {
              Location: path
            }
          });
        } : onlyAvailableInSSR("Astro.redirect"),
        resolve(path) {
          let extra = `This can be replaced with a dynamic import like so: await import("${path}")`;
          if (isCSSRequest(path)) {
            extra = `It looks like you are resolving styles. If you are adding a link tag, replace with this:
---
import "${path}";
---
`;
          } else if (isScriptRequest(path)) {
            extra = `It looks like you are resolving scripts. If you are adding a script tag, replace with this:

<script type="module" src={(await import("${path}?url")).default}><\/script>

or consider make it a module like so:

<script>
	import MyModule from "${path}";
<\/script>
`;
          }
          warn(
            args.logging,
            `deprecation`,
            `${bold(
              "Astro.resolve()"
            )} is deprecated. We see that you are trying to resolve ${path}.
${extra}`
          );
          return "";
        },
        response,
        slots: astroSlots
      };
      Object.defineProperty(Astro, "canonicalURL", {
        get: function() {
          warn(
            args.logging,
            "deprecation",
            `${bold("Astro.canonicalURL")} is deprecated! Use \`Astro.url\` instead.
Example:

---
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---
`
          );
          return new URL(this.request.url.pathname, this.site);
        }
      });
      Object.defineProperty(Astro, "__renderMarkdown", {
        enumerable: false,
        writable: false,
        value: async function(content, opts) {
          if (typeof Deno !== "undefined") {
            throw new Error("Markdown is not supported in Deno SSR");
          }
          if (!renderMarkdown) {
            let astroRemark = "@astrojs/";
            astroRemark += "markdown-remark";
            renderMarkdown = (await import(astroRemark)).renderMarkdown;
          }
          const { code } = await renderMarkdown(content, { ...markdown, ...opts ?? {} });
          return code;
        }
      });
      return Astro;
    },
    resolve: resolve2,
    _metadata: {
      renderers: renderers2,
      pathname,
      hasHydrationScript: false,
      hasRenderedHead: false,
      hasDirectives: /* @__PURE__ */ new Set()
    },
    response
  };
  return result;
}
function generatePaginateFunction(routeMatch) {
  return function paginateUtility(data, args = {}) {
    let { pageSize: _pageSize, params: _params, props: _props } = args;
    const pageSize = _pageSize || 10;
    const paramName = "page";
    const additionalParams = _params || {};
    const additionalProps = _props || {};
    let includesFirstPageNumber;
    if (routeMatch.params.includes(`...${paramName}`)) {
      includesFirstPageNumber = false;
    } else if (routeMatch.params.includes(`${paramName}`)) {
      includesFirstPageNumber = true;
    } else {
      throw new Error(
        `[paginate()] page number param \`${paramName}\` not found in your filepath.
Rename your file to \`[...page].astro\` or customize the param name via the \`paginate([], {param: '...'}\` option.`
      );
    }
    const lastPage = Math.max(1, Math.ceil(data.length / pageSize));
    const result = [...Array(lastPage).keys()].map((num) => {
      const pageNum = num + 1;
      const start2 = pageSize === Infinity ? 0 : (pageNum - 1) * pageSize;
      const end = Math.min(start2 + pageSize, data.length);
      const params = {
        ...additionalParams,
        [paramName]: includesFirstPageNumber || pageNum > 1 ? String(pageNum) : void 0
      };
      return {
        params,
        props: {
          ...additionalProps,
          page: {
            data: data.slice(start2, end),
            start: start2,
            end: end - 1,
            size: pageSize,
            total: data.length,
            currentPage: pageNum,
            lastPage,
            url: {
              current: routeMatch.generate({ ...params }),
              next: pageNum === lastPage ? void 0 : routeMatch.generate({ ...params, page: String(pageNum + 1) }),
              prev: pageNum === 1 ? void 0 : routeMatch.generate({
                ...params,
                page: !includesFirstPageNumber && pageNum - 1 === 1 ? void 0 : String(pageNum - 1)
              })
            }
          }
        }
      };
    });
    return result;
  };
}
async function callGetStaticPaths({
  isValidate,
  logging,
  mod,
  route,
  ssr
}) {
  validateDynamicRouteModule(mod, { ssr, logging });
  if (ssr) {
    return { staticPaths: Object.assign([], { keyed: /* @__PURE__ */ new Map() }) };
  }
  if (!mod.getStaticPaths) {
    throw new Error("Unexpected Error.");
  }
  let staticPaths = [];
  staticPaths = (await mod.getStaticPaths({
    paginate: generatePaginateFunction(route),
    rss() {
      throw new Error(
        "The RSS helper has been removed from getStaticPaths! Try the new @astrojs/rss package instead. See https://docs.astro.build/en/guides/rss/"
      );
    }
  })).flat();
  const keyedStaticPaths = staticPaths;
  keyedStaticPaths.keyed = /* @__PURE__ */ new Map();
  for (const sp of keyedStaticPaths) {
    const paramsKey = stringifyParams(sp.params);
    keyedStaticPaths.keyed.set(paramsKey, sp);
  }
  if (isValidate) {
    validateGetStaticPathsResult(keyedStaticPaths, logging);
  }
  return {
    staticPaths: keyedStaticPaths
  };
}
var RouteCache = class {
  constructor(logging) {
    this.cache = {};
    this.logging = logging;
  }
  clearAll() {
    this.cache = {};
  }
  set(route, entry) {
    if (this.cache[route.component]) {
      warn(
        this.logging,
        "routeCache",
        `Internal Warning: route cache overwritten. (${route.component})`
      );
    }
    this.cache[route.component] = entry;
  }
  get(route) {
    return this.cache[route.component];
  }
};
function findPathItemByKey(staticPaths, params) {
  const paramsKey = stringifyParams(params);
  const matchedStaticPath = staticPaths.keyed.get(paramsKey);
  if (matchedStaticPath) {
    return matchedStaticPath;
  }
  debug("findPathItemByKey", `Unexpected cache miss looking for ${paramsKey}`);
}
var GetParamsAndPropsError = /* @__PURE__ */ ((GetParamsAndPropsError2) => {
  GetParamsAndPropsError2[GetParamsAndPropsError2["NoMatchingStaticPath"] = 0] = "NoMatchingStaticPath";
  return GetParamsAndPropsError2;
})(GetParamsAndPropsError || {});
async function getParamsAndProps(opts) {
  const { logging, mod, route, routeCache, pathname, ssr } = opts;
  let params = {};
  let pageProps;
  if (route && !route.pathname) {
    if (route.params.length) {
      const paramsMatch = route.pattern.exec(pathname);
      if (paramsMatch) {
        params = getParams(route.params)(paramsMatch);
      }
    }
    let routeCacheEntry = routeCache.get(route);
    if (!routeCacheEntry) {
      routeCacheEntry = await callGetStaticPaths({ mod, route, isValidate: true, logging, ssr });
      routeCache.set(route, routeCacheEntry);
    }
    const matchedStaticPath = findPathItemByKey(routeCacheEntry.staticPaths, params);
    if (!matchedStaticPath && !ssr) {
      return 0;
    }
    pageProps = (matchedStaticPath == null ? void 0 : matchedStaticPath.props) ? { ...matchedStaticPath.props } : {};
  } else {
    pageProps = {};
  }
  return [params, pageProps];
}
async function render(opts) {
  const {
    adapterName,
    links,
    styles,
    logging,
    origin,
    markdown,
    mod,
    mode,
    pathname,
    scripts,
    renderers: renderers2,
    request,
    resolve: resolve2,
    route,
    routeCache,
    site,
    ssr,
    streaming,
    status = 200
  } = opts;
  const paramsAndPropsRes = await getParamsAndProps({
    logging,
    mod,
    route,
    routeCache,
    pathname,
    ssr
  });
  if (paramsAndPropsRes === 0) {
    throw new Error(
      `[getStaticPath] route pattern matched, but no matching static path found. (${pathname})`
    );
  }
  const [params, pageProps] = paramsAndPropsRes;
  const Component = await mod.default;
  if (!Component)
    throw new Error(`Expected an exported Astro component but received typeof ${typeof Component}`);
  const result = createResult({
    adapterName,
    links,
    styles,
    logging,
    markdown,
    mode,
    origin,
    params,
    props: pageProps,
    pathname,
    resolve: resolve2,
    renderers: renderers2,
    request,
    site,
    scripts,
    ssr,
    status
  });
  if (typeof mod.components === "object") {
    Object.assign(pageProps, { components: mod.components });
  }
  if (typeof mod.default === "function" && mod.default.name.startsWith("MDX")) {
    Object.assign(pageProps, {
      components: Object.assign((pageProps == null ? void 0 : pageProps.components) ?? {}, { Fragment })
    });
  }
  const response = await renderPage(result, Component, pageProps, null, streaming);
  if (result.cookies) {
    attachToResponse(response, result.cookies);
  }
  return response;
}
function createAPIContext(request, params) {
  return {
    cookies: new AstroCookies(request),
    request,
    params
  };
}
async function call(mod, opts) {
  const paramsAndPropsResp = await getParamsAndProps({ ...opts, mod });
  if (paramsAndPropsResp === GetParamsAndPropsError.NoMatchingStaticPath) {
    throw new Error(
      `[getStaticPath] route pattern matched, but no matching static path found. (${opts.pathname})`
    );
  }
  const [params] = paramsAndPropsResp;
  const context = createAPIContext(opts.request, params);
  const response = await renderEndpoint(mod, context, opts.ssr);
  if (response instanceof Response) {
    attachToResponse(response, context.cookies);
    return {
      type: "response",
      response
    };
  }
  return {
    type: "simple",
    body: response.body,
    encoding: response.encoding
  };
}
var lastMessage;
var lastMessageCount = 1;
var consoleLogDestination = {
  write(event) {
    let dest = console.error;
    if (levels[event.level] < levels["error"]) {
      dest = console.log;
    }
    function getPrefix() {
      let prefix = "";
      let type = event.type;
      if (type) {
        prefix += dim(dateTimeFormat.format(new Date()) + " ");
        if (event.level === "info") {
          type = bold(cyan(`[${type}]`));
        } else if (event.level === "warn") {
          type = bold(yellow(`[${type}]`));
        } else if (event.level === "error") {
          type = bold(red(`[${type}]`));
        }
        prefix += `${type} `;
      }
      return reset(prefix);
    }
    let message = event.message;
    if (message === lastMessage) {
      lastMessageCount++;
      message = `${message} ${yellow(`(x${lastMessageCount})`)}`;
    } else {
      lastMessage = message;
      lastMessageCount = 1;
    }
    const outMessage = getPrefix() + message;
    dest(outMessage);
    return true;
  }
};
function appendForwardSlash(path) {
  return path.endsWith("/") ? path : path + "/";
}
function prependForwardSlash(path) {
  return path[0] === "/" ? path : "/" + path;
}
function trimSlashes(path) {
  return path.replace(/^\/|\/$/g, "");
}
function isString(path) {
  return typeof path === "string" || path instanceof String;
}
function joinPaths(...paths) {
  return paths.filter(isString).map(trimSlashes).join("/");
}
function assertPath(path) {
  if (typeof path !== "string") {
    throw new TypeError("Path must be a string. Received " + JSON.stringify(path));
  }
}
function normalizeStringPosix(path, allowAboveRoot) {
  var res = "";
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47)
      break;
    else
      code = 47;
    if (code === 47) {
      if (lastSlash === i - 1 || dots === 1)
        ;
      else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = "";
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += "/..";
          else
            res = "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += "/" + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}
var posix = {
  resolve: function resolve() {
    var resolvedPath = "";
    var resolvedAbsolute = false;
    var cwd;
    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === void 0)
          cwd = process.cwd();
        path = cwd;
      }
      assertPath(path);
      if (path.length === 0) {
        continue;
      }
      resolvedPath = path + "/" + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47;
    }
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return "/" + resolvedPath;
      else
        return "/";
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return ".";
    }
  },
  normalize: function normalize(path) {
    assertPath(path);
    if (path.length === 0)
      return ".";
    var isAbsolute2 = path.charCodeAt(0) === 47;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47;
    path = normalizeStringPosix(path, !isAbsolute2);
    if (path.length === 0 && !isAbsolute2)
      path = ".";
    if (path.length > 0 && trailingSeparator)
      path += "/";
    if (isAbsolute2)
      return "/" + path;
    return path;
  },
  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47;
  },
  join: function join() {
    if (arguments.length === 0)
      return ".";
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === void 0)
          joined = arg;
        else
          joined += "/" + arg;
      }
    }
    if (joined === void 0)
      return ".";
    return posix.normalize(joined);
  },
  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);
    if (from === to)
      return "";
    from = posix.resolve(from);
    to = posix.resolve(to);
    if (from === to)
      return "";
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47) {
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47) {
            lastCommonSep = i;
          } else if (i === 0) {
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47)
        lastCommonSep = i;
    }
    var out = "";
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47) {
        if (out.length === 0)
          out += "..";
        else
          out += "/..";
      }
    }
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47)
        ++toStart;
      return to.slice(toStart);
    }
  },
  _makeLong: function _makeLong(path) {
    return path;
  },
  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0)
      return ".";
    var code = path.charCodeAt(0);
    var hasRoot = code === 47;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
        matchedSlash = false;
      }
    }
    if (end === -1)
      return hasRoot ? "/" : ".";
    if (hasRoot && end === 1)
      return "//";
    return path.slice(0, end);
  },
  basename: function basename(path, ext) {
    if (ext !== void 0 && typeof ext !== "string")
      throw new TypeError('"ext" argument must be a string');
    assertPath(path);
    var start2 = 0;
    var end = -1;
    var matchedSlash = true;
    var i;
    if (ext !== void 0 && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path)
        return "";
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            start2 = i + 1;
            break;
          }
        } else {
          if (firstNonSlashEnd === -1) {
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                end = i;
              }
            } else {
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }
      if (start2 === end)
        end = firstNonSlashEnd;
      else if (end === -1)
        end = path.length;
      return path.slice(start2, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47) {
          if (!matchedSlash) {
            start2 = i + 1;
            break;
          }
        } else if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
      }
      if (end === -1)
        return "";
      return path.slice(start2, end);
    }
  },
  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47) {
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46) {
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
      } else if (startDot !== -1) {
        preDotState = -1;
      }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return "";
    }
    return path.slice(startDot, end);
  },
  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format("/", pathObject);
  },
  parse: function parse(path) {
    assertPath(path);
    var ret = { root: "", dir: "", base: "", ext: "", name: "" };
    if (path.length === 0)
      return ret;
    var code = path.charCodeAt(0);
    var isAbsolute2 = code === 47;
    var start2;
    if (isAbsolute2) {
      ret.root = "/";
      start2 = 1;
    } else {
      start2 = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;
    var preDotState = 0;
    for (; i >= start2; --i) {
      code = path.charCodeAt(i);
      if (code === 47) {
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46) {
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
      } else if (startDot !== -1) {
        preDotState = -1;
      }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute2)
          ret.base = ret.name = path.slice(1, end);
        else
          ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute2) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }
    if (startPart > 0)
      ret.dir = path.slice(0, startPart - 1);
    else if (isAbsolute2)
      ret.dir = "/";
    return ret;
  },
  sep: "/",
  delimiter: ":",
  win32: null,
  posix: null
};
posix.posix = posix;
var pathBrowserify = posix;
function getRootPath(site) {
  return appendForwardSlash(new URL(site || "http://localhost/").pathname);
}
function joinToRoot(href, site) {
  return pathBrowserify.posix.join(getRootPath(site), href);
}
function createLinkStylesheetElement(href, site) {
  return {
    props: {
      rel: "stylesheet",
      href: joinToRoot(href, site)
    },
    children: ""
  };
}
function createLinkStylesheetElementSet(hrefs, site) {
  return new Set(hrefs.map((href) => createLinkStylesheetElement(href, site)));
}
function createModuleScriptElement(script, site) {
  if (script.type === "external") {
    return createModuleScriptElementWithSrc(script.value, site);
  } else {
    return {
      props: {
        type: "module"
      },
      children: script.value
    };
  }
}
function createModuleScriptElementWithSrc(src, site) {
  return {
    props: {
      type: "module",
      src: joinToRoot(src, site)
    },
    children: ""
  };
}
function matchRoute(pathname, manifest) {
  return manifest.routes.find((route) => route.pattern.test(pathname));
}
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code === 95) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
  var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || defaultPattern,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode2 = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode2(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode2(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path;
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return segment[0].spread ? `/:${segment[0].content.slice(3)}(.*)?` : "/" + segment.map((part) => {
      if (part)
        return part.dynamic ? `:${part.content}` : part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}
function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments
  };
}
function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  return {
    ...serializedManifest,
    assets,
    routes
  };
}
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var _manifest$1;
var _manifestData;
var _routeDataToRouteInfo;
var _routeCache;
var _encoder;
var _logging;
var _streaming;
var _renderPage;
var renderPage_fn;
var _callEndpoint;
var callEndpoint_fn;
var App = class {
  constructor(manifest, streaming = true) {
    __privateAdd(this, _renderPage);
    __privateAdd(this, _callEndpoint);
    __privateAdd(this, _manifest$1, void 0);
    __privateAdd(this, _manifestData, void 0);
    __privateAdd(this, _routeDataToRouteInfo, void 0);
    __privateAdd(this, _routeCache, void 0);
    __privateAdd(this, _encoder, new TextEncoder());
    __privateAdd(this, _logging, {
      dest: consoleLogDestination,
      level: "info"
    });
    __privateAdd(this, _streaming, void 0);
    __privateSet(this, _manifest$1, manifest);
    __privateSet(this, _manifestData, {
      routes: manifest.routes.map((route) => route.routeData)
    });
    __privateSet(this, _routeDataToRouteInfo, new Map(manifest.routes.map((route) => [route.routeData, route])));
    __privateSet(this, _routeCache, new RouteCache(__privateGet(this, _logging)));
    __privateSet(this, _streaming, streaming);
  }
  match(request, { matchNotFound = false } = {}) {
    const url2 = new URL(request.url);
    if (__privateGet(this, _manifest$1).assets.has(url2.pathname)) {
      return void 0;
    }
    let routeData = matchRoute(url2.pathname, __privateGet(this, _manifestData));
    if (routeData) {
      return routeData;
    } else if (matchNotFound) {
      return matchRoute("/404", __privateGet(this, _manifestData));
    } else {
      return void 0;
    }
  }
  async render(request, routeData) {
    let defaultStatus = 200;
    if (!routeData) {
      routeData = this.match(request);
      if (!routeData) {
        defaultStatus = 404;
        routeData = this.match(request, { matchNotFound: true });
      }
      if (!routeData) {
        return new Response(null, {
          status: 404,
          statusText: "Not found"
        });
      }
    }
    if (routeData.route === "/404") {
      defaultStatus = 404;
    }
    let mod = __privateGet(this, _manifest$1).pageMap.get(routeData.component);
    if (routeData.type === "page") {
      let response = await __privateMethod(this, _renderPage, renderPage_fn).call(this, request, routeData, mod, defaultStatus);
      if (response.status === 500) {
        const fiveHundredRouteData = matchRoute("/500", __privateGet(this, _manifestData));
        if (fiveHundredRouteData) {
          mod = __privateGet(this, _manifest$1).pageMap.get(fiveHundredRouteData.component);
          try {
            let fiveHundredResponse = await __privateMethod(this, _renderPage, renderPage_fn).call(this, request, fiveHundredRouteData, mod, 500);
            return fiveHundredResponse;
          } catch {
          }
        }
      }
      return response;
    } else if (routeData.type === "endpoint") {
      return __privateMethod(this, _callEndpoint, callEndpoint_fn).call(this, request, routeData, mod, defaultStatus);
    } else {
      throw new Error(`Unsupported route type [${routeData.type}].`);
    }
  }
  setCookieHeaders(response) {
    return getSetCookiesFromResponse(response);
  }
};
_manifest$1 = /* @__PURE__ */ new WeakMap();
_manifestData = /* @__PURE__ */ new WeakMap();
_routeDataToRouteInfo = /* @__PURE__ */ new WeakMap();
_routeCache = /* @__PURE__ */ new WeakMap();
_encoder = /* @__PURE__ */ new WeakMap();
_logging = /* @__PURE__ */ new WeakMap();
_streaming = /* @__PURE__ */ new WeakMap();
_renderPage = /* @__PURE__ */ new WeakSet();
renderPage_fn = async function(request, routeData, mod, status = 200) {
  const url2 = new URL(request.url);
  const manifest = __privateGet(this, _manifest$1);
  const renderers2 = manifest.renderers;
  const info = __privateGet(this, _routeDataToRouteInfo).get(routeData);
  const links = createLinkStylesheetElementSet(info.links, manifest.site);
  let scripts = /* @__PURE__ */ new Set();
  for (const script of info.scripts) {
    if ("stage" in script) {
      if (script.stage === "head-inline") {
        scripts.add({
          props: {},
          children: script.children
        });
      }
    } else {
      scripts.add(createModuleScriptElement(script, manifest.site));
    }
  }
  try {
    const response = await render({
      adapterName: manifest.adapterName,
      links,
      logging: __privateGet(this, _logging),
      markdown: manifest.markdown,
      mod,
      mode: "production",
      origin: url2.origin,
      pathname: url2.pathname,
      scripts,
      renderers: renderers2,
      async resolve(specifier) {
        if (!(specifier in manifest.entryModules)) {
          throw new Error(`Unable to resolve [${specifier}]`);
        }
        const bundlePath = manifest.entryModules[specifier];
        switch (true) {
          case bundlePath.startsWith("data:"):
          case bundlePath.length === 0: {
            return bundlePath;
          }
          default: {
            return prependForwardSlash(joinPaths(manifest.base, bundlePath));
          }
        }
      },
      route: routeData,
      routeCache: __privateGet(this, _routeCache),
      site: __privateGet(this, _manifest$1).site,
      ssr: true,
      request,
      streaming: __privateGet(this, _streaming),
      status
    });
    return response;
  } catch (err) {
    error(__privateGet(this, _logging), "ssr", err.stack || err.message || String(err));
    return new Response(null, {
      status: 500,
      statusText: "Internal server error"
    });
  }
};
_callEndpoint = /* @__PURE__ */ new WeakSet();
callEndpoint_fn = async function(request, routeData, mod, status = 200) {
  const url2 = new URL(request.url);
  const handler = mod;
  const result = await call(handler, {
    logging: __privateGet(this, _logging),
    origin: url2.origin,
    pathname: url2.pathname,
    request,
    route: routeData,
    routeCache: __privateGet(this, _routeCache),
    ssr: true,
    status
  });
  if (result.type === "response") {
    if (result.response.headers.get("X-Astro-Response") === "Not-Found") {
      const fourOhFourRequest = new Request(new URL("/404", request.url));
      const fourOhFourRouteData = this.match(fourOhFourRequest);
      if (fourOhFourRouteData) {
        return this.render(fourOhFourRequest, fourOhFourRouteData);
      }
    }
    return result.response;
  } else {
    const body = result.body;
    const headers = new Headers();
    const mimeType = mime.getType(url2.pathname);
    if (mimeType) {
      headers.set("Content-Type", `${mimeType};charset=utf-8`);
    } else {
      headers.set("Content-Type", "text/plain;charset=utf-8");
    }
    const bytes = __privateGet(this, _encoder).encode(body);
    headers.set("Content-Length", bytes.byteLength.toString());
    return new Response(bytes, {
      status: 200,
      headers
    });
  }
};
var _server = void 0;
var _startPromise = void 0;
function start$1(manifest, options) {
  if (options.start === false) {
    return;
  }
  const clientRoot = new URL("../client/", import.meta.url);
  const app = new App(manifest);
  const handler = async (request, connInfo) => {
    var _a;
    if (app.match(request)) {
      let ip = (_a = connInfo == null ? void 0 : connInfo.remoteAddr) == null ? void 0 : _a.hostname;
      Reflect.set(request, Symbol.for("astro.clientAddress"), ip);
      const response = await app.render(request);
      if (app.setCookieHeaders) {
        for (const setCookieHeader of app.setCookieHeaders(response)) {
          response.headers.append("Set-Cookie", setCookieHeader);
        }
      }
      return response;
    }
    const url2 = new URL(request.url);
    const localPath = new URL("." + url2.pathname, clientRoot);
    const fileResp = await fetch(localPath.toString());
    if (fileResp.status == 404) {
      const response = await app.render(request);
      if (app.setCookieHeaders) {
        for (const setCookieHeader of app.setCookieHeaders(response)) {
          response.headers.append("Set-Cookie", setCookieHeader);
        }
      }
      return response;
    } else {
      return fileResp;
    }
  };
  const port = options.port ?? 8085;
  _server = new Server({
    port,
    hostname: options.hostname ?? "0.0.0.0",
    handler
  });
  _startPromise = Promise.resolve(_server.listenAndServe());
  console.error(`Server running on port ${port}`);
}
function createExports(manifest, options) {
  const app = new App(manifest);
  return {
    async stop() {
      if (_server) {
        _server.close();
        _server = void 0;
      }
      await Promise.resolve(_startPromise);
    },
    running() {
      return _server !== void 0;
    },
    async start() {
      return start$1(manifest, options);
    },
    async handle(request) {
      return app.render(request);
    }
  };
}
var adapter = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createExports,
  start: start$1
}, Symbol.toStringTag, { value: "Module" }));
var AstroJSX = "astro:jsx";
var Empty = Symbol("empty");
var toSlotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
function isVNode(vnode) {
  return vnode && typeof vnode === "object" && vnode[AstroJSX];
}
function transformSlots(vnode) {
  if (typeof vnode.type === "string")
    return vnode;
  const slots = {};
  if (isVNode(vnode.props.children)) {
    const child = vnode.props.children;
    if (!isVNode(child))
      return;
    if (!("slot" in child.props))
      return;
    const name = toSlotName(child.props.slot);
    slots[name] = [child];
    slots[name]["$$slot"] = true;
    delete child.props.slot;
    delete vnode.props.children;
  }
  if (Array.isArray(vnode.props.children)) {
    vnode.props.children = vnode.props.children.map((child) => {
      if (!isVNode(child))
        return child;
      if (!("slot" in child.props))
        return child;
      const name = toSlotName(child.props.slot);
      if (Array.isArray(slots[name])) {
        slots[name].push(child);
      } else {
        slots[name] = [child];
        slots[name]["$$slot"] = true;
      }
      delete child.props.slot;
      return Empty;
    }).filter((v) => v !== Empty);
  }
  Object.assign(vnode.props, slots);
}
function markRawChildren(child) {
  if (typeof child === "string")
    return markHTMLString(child);
  if (Array.isArray(child))
    return child.map((c) => markRawChildren(c));
  return child;
}
function transformSetDirectives(vnode) {
  if (!("set:html" in vnode.props || "set:text" in vnode.props))
    return;
  if ("set:html" in vnode.props) {
    const children = markRawChildren(vnode.props["set:html"]);
    delete vnode.props["set:html"];
    Object.assign(vnode.props, { children });
    return;
  }
  if ("set:text" in vnode.props) {
    const children = vnode.props["set:text"];
    delete vnode.props["set:text"];
    Object.assign(vnode.props, { children });
    return;
  }
}
function createVNode(type, props) {
  const vnode = {
    [Renderer]: "astro:jsx",
    [AstroJSX]: true,
    type,
    props: props ?? {}
  };
  transformSetDirectives(vnode);
  transformSlots(vnode);
  return vnode;
}
var ClientOnlyPlaceholder = "astro-client-only";
var skipAstroJSXCheck = /* @__PURE__ */ new WeakSet();
var originalConsoleError;
var consoleFilterRefs = 0;
async function renderJSX(result, vnode) {
  switch (true) {
    case vnode instanceof HTMLString:
      if (vnode.toString().trim() === "") {
        return "";
      }
      return vnode;
    case typeof vnode === "string":
      return markHTMLString(escapeHTML(vnode));
    case (!vnode && vnode !== 0):
      return "";
    case Array.isArray(vnode):
      return markHTMLString(
        (await Promise.all(vnode.map((v) => renderJSX(result, v)))).join("")
      );
  }
  if (isVNode(vnode)) {
    switch (true) {
      case !vnode.type: {
        throw new Error(`Unable to render ${result._metadata.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`);
      }
      case vnode.type === Symbol.for("astro:fragment"):
        return renderJSX(result, vnode.props.children);
      case vnode.type.isAstroComponentFactory: {
        let props = {};
        let slots = {};
        for (const [key, value] of Object.entries(vnode.props ?? {})) {
          if (key === "children" || value && typeof value === "object" && value["$$slot"]) {
            slots[key === "children" ? "default" : key] = () => renderJSX(result, value);
          } else {
            props[key] = value;
          }
        }
        return markHTMLString(await renderToString(result, vnode.type, props, slots));
      }
      case (!vnode.type && vnode.type !== 0):
        return "";
      case (typeof vnode.type === "string" && vnode.type !== ClientOnlyPlaceholder):
        return markHTMLString(await renderElement(result, vnode.type, vnode.props ?? {}));
    }
    if (vnode.type) {
      let extractSlots2 = function(child) {
        if (Array.isArray(child)) {
          return child.map((c) => extractSlots2(c));
        }
        if (!isVNode(child)) {
          _slots2.default.push(child);
          return;
        }
        if ("slot" in child.props) {
          _slots2[child.props.slot] = [..._slots2[child.props.slot] ?? [], child];
          delete child.props.slot;
          return;
        }
        _slots2.default.push(child);
      };
      if (typeof vnode.type === "function" && vnode.type["astro:renderer"]) {
        skipAstroJSXCheck.add(vnode.type);
      }
      if (typeof vnode.type === "function" && vnode.props["server:root"]) {
        const output2 = await vnode.type(vnode.props ?? {});
        return await renderJSX(result, output2);
      }
      if (typeof vnode.type === "function" && !skipAstroJSXCheck.has(vnode.type)) {
        useConsoleFilter();
        try {
          const output2 = await vnode.type(vnode.props ?? {});
          if (output2 && output2[AstroJSX]) {
            return await renderJSX(result, output2);
          } else if (!output2) {
            return await renderJSX(result, output2);
          }
        } catch (e) {
          skipAstroJSXCheck.add(vnode.type);
        } finally {
          finishUsingConsoleFilter();
        }
      }
      const { children = null, ...props } = vnode.props ?? {};
      const _slots2 = {
        default: []
      };
      extractSlots2(children);
      for (const [key, value] of Object.entries(props)) {
        if (value["$$slot"]) {
          _slots2[key] = value;
          delete props[key];
        }
      }
      const slotPromises = [];
      const slots = {};
      for (const [key, value] of Object.entries(_slots2)) {
        slotPromises.push(
          renderJSX(result, value).then((output2) => {
            if (output2.toString().trim().length === 0)
              return;
            slots[key] = () => output2;
          })
        );
      }
      await Promise.all(slotPromises);
      let output;
      if (vnode.type === ClientOnlyPlaceholder && vnode.props["client:only"]) {
        output = await renderComponent(
          result,
          vnode.props["client:display-name"] ?? "",
          null,
          props,
          slots
        );
      } else {
        output = await renderComponent(
          result,
          typeof vnode.type === "function" ? vnode.type.name : vnode.type,
          vnode.type,
          props,
          slots
        );
      }
      if (typeof output !== "string" && Symbol.asyncIterator in output) {
        let parts = new HTMLParts();
        for await (const chunk of output) {
          parts.append(chunk, result);
        }
        return markHTMLString(parts.toString());
      } else {
        return markHTMLString(output);
      }
    }
  }
  return markHTMLString(`${vnode}`);
}
async function renderElement(result, tag, { children, ...props }) {
  return markHTMLString(
    `<${tag}${spreadAttributes(props)}${markHTMLString(
      (children == null || children == "") && voidElementNames.test(tag) ? `/>` : `>${children == null ? "" : await renderJSX(result, children)}</${tag}>`
    )}`
  );
}
function useConsoleFilter() {
  consoleFilterRefs++;
  if (!originalConsoleError) {
    originalConsoleError = console.error;
    try {
      console.error = filteredConsoleError;
    } catch (error2) {
    }
  }
}
function finishUsingConsoleFilter() {
  consoleFilterRefs--;
}
function filteredConsoleError(msg, ...rest) {
  if (consoleFilterRefs > 0 && typeof msg === "string") {
    const isKnownReactHookError = msg.includes("Warning: Invalid hook call.") && msg.includes("https://reactjs.org/link/invalid-hook-call");
    if (isKnownReactHookError)
      return;
  }
  originalConsoleError(msg, ...rest);
}
var slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
async function check(Component, props, { default: children = null, ...slotted } = {}) {
  if (typeof Component !== "function")
    return false;
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  try {
    const result = await Component({ ...props, ...slots, children });
    return result[AstroJSX];
  } catch (e) {
  }
  return false;
}
async function renderToStaticMarkup(Component, props = {}, { default: children = null, ...slotted } = {}) {
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  const { result } = this;
  const html2 = await renderJSX(result, createVNode(Component, { ...props, ...slots, children }));
  return { html: html2 };
}
var server_default = {
  check,
  renderToStaticMarkup
};
var raw_menu = [
  {
    text: "Home",
    href: "/",
    items: [
      {
        text: "Page 1",
        href: "/page1"
      },
      {
        text: "Page 2",
        href: "/page2"
      },
      {
        text: "Domain 1",
        items: [
          {
            text: "Sub Page 1",
            href: "/domain1/subpage1"
          },
          {
            text: "Sub Page 2",
            href: "/domain1/subpage2"
          }
        ]
      },
      {
        text: "Page 3",
        href: "/page3"
      },
      {
        text: "Domain 2 index",
        href: "/domain2/",
        items: [
          {
            text: "Sub Page 4",
            href: "/domain2/subpage4"
          },
          {
            text: "Sub Domain 2 index",
            href: "/domain2/subdomain2/",
            items: [
              {
                text: "s page5",
                href: "/domain2/subdomain2/spage5"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    text: "Markdown",
    href: "/markdown",
    items: [
      {
        text: "hello",
        href: "/markdown/hello"
      },
      {
        text: "Code Highlight",
        href: "/markdown/code"
      },
      {
        text: "MDX Components",
        href: "/markdown/components"
      }
    ]
  },
  {
    text: "About",
    href: "/about"
  }
];
var $$module3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: raw_menu
}, Symbol.toStringTag, { value: "Module" }));
function root_page$1(url2) {
  let str = String(url2);
  if (str.includes("//")) {
    str = str.split("//")[1];
  }
  if (str.includes("/")) {
    str = str.split("/")[1];
  } else {
    str = "";
  }
  return `/${str}`;
}
function url_path$1(url2) {
  let str = String(url2);
  if (str.includes("//")) {
    str = str.split("//")[1];
  }
  if (str.includes("/")) {
    const start2 = str.indexOf("/") + 1;
    str = str.substring(start2);
  } else {
    str = "";
  }
  return `/${str}`;
}
function active_page$1(url2, menu) {
  const page = root_page$1(url2);
  let active_page_index = menu.map((item) => item.href).indexOf(page);
  if (active_page_index == -1) {
    active_page_index = 0;
  }
  return active_page_index;
}
function active_subpage$1(url2, submenu) {
  const path = url_path$1(url2);
  let res_index = -1;
  submenu.forEach((element, index) => {
    if (path.startsWith(element.href)) {
      res_index = index;
    }
  });
  return res_index;
}
var $$module2$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  root_page: root_page$1,
  active_page: active_page$1,
  active_subpage: active_subpage$1
}, Symbol.toStringTag, { value: "Module" }));
var $$metadata$g = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/AppBar.astro", { modules: [{ module: $$module3, specifier: "../config/menu.json", assert: {} }, { module: $$module2$3, specifier: "../components/utils", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
var $$Astro$h = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/AppBar.astro", "http://localhost/", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
var $$AppBar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$AppBar;
  const active_page_index = active_page$1(Astro2.url, raw_menu);
  raw_menu.forEach((item, index) => {
    item.active_class = index == active_page_index ? "active" : "";
  });
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "class": "astro-LRRQEVL7" })}${raw_menu.map((item) => renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(item.href, "href")}${addAttribute(item.active_class + " astro-LRRQEVL7", "class")}>${item.text}</a>`)}


`;
});
var $$file$g = "D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/AppBar.astro";
var $$url$g = void 0;
var $$module1$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$g,
  default: $$AppBar,
  file: $$file$g,
  url: $$url$g
}, Symbol.toStringTag, { value: "Module" }));
var $$metadata$f = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/svg/rightarrow.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
var $$Astro$g = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/svg/rightarrow.astro", "http://localhost/", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
var $$Rightarrow = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$Rightarrow;
  return renderTemplate`${maybeRenderHead($$result)}<svg viewBox="0 0 100 100" width="60" height="60" fill="#00000000" xmlns="http://www.w3.org/2000/svg">
    <path d="M 20,10 L 70,50 L 20,90" stroke-width="20px" stroke="#d0d0d0" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`;
});
var $$file$f = "D:/Dev/MicroWebStacks/astro_nav_menus/src/svg/rightarrow.astro";
var $$url$f = void 0;
var $$module2$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$f,
  default: $$Rightarrow,
  file: $$file$f,
  url: $$url$f
}, Symbol.toStringTag, { value: "Module" }));
var $$metadata$e = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/SubMenu.astro", { modules: [{ module: $$module1$1, specifier: "./SubMenu.astro", assert: {} }, { module: $$module2$2, specifier: "../svg/rightarrow.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [{ type: "inline", value: `
    //This script is here and not under Submenu to make it run only once
    let toggler = document.getElementsByClassName("parent");
    for (let i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener("click", function(e) {
          this.parentElement.parentElement.querySelector("ul")?.classList.toggle("hidden");
          this.classList.toggle("expanded");
          e.preventDefault()
      });
    }
` }] });
var $$Astro$f = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/SubMenu.astro", "http://localhost/", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
var $$SubMenu = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$SubMenu;
  const { items, root = true } = Astro2.props;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`${items && renderTemplate`${maybeRenderHead($$result)}<ul${addAttribute((root ? "" : "nested") + " astro-7EM45CLO", "class")}>
        ${items.map((item) => renderTemplate`<li class="astro-7EM45CLO">
                <a${addAttribute(item.href, "href")}${addAttribute((item.active ? "active" : "") + " astro-7EM45CLO", "class")}>
                    ${item.parent ? renderTemplate`<span${addAttribute([[{ parent: true, expanded: item.expanded }], "astro-7EM45CLO"], "class:list")}>
                            <svg viewBox="0 0 100 100" width="60" height="60" fill="#00000000" xmlns="http://www.w3.org/2000/svg" class="astro-7EM45CLO">
                                <path d="M 20,10 L 70,50 L 20,90" stroke-width="20px" stroke="#d0d0d0" stroke-linecap="round" stroke-linejoin="round" class="astro-7EM45CLO"></path>
                            </svg>
                        </span>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "class": "astro-7EM45CLO" })}`}
                    <span class="astro-7EM45CLO">${item.text}</span>
                </a>
                ${renderComponent($$result, "SubMenu", $$SubMenu, { "items": item.items, "root": false, "class": "astro-7EM45CLO" })}
            </li>`)}
    </ul>`}



${maybeRenderHead($$result)}`;
});
var $$file$e = "D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/SubMenu.astro";
var $$url$e = void 0;
var $$metadata$d = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/TreeMenu.astro", { modules: [{ module: $$module1$1, specifier: "./SubMenu.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
var $$Astro$e = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/TreeMenu.astro", "http://localhost/", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
var $$TreeMenu = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$TreeMenu;
  let { items } = Astro2.props;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`${maybeRenderHead($$result)}<nav data-width="20vw" data-state="open" class="astro-IRQJ4JWG">
    ${renderComponent($$result, "SubMenu", $$SubMenu, { "items": items, "class": "astro-IRQJ4JWG" })}
</nav>

`;
});
var $$file$d = "D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/TreeMenu.astro";
var $$url$d = void 0;
var $$module2$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$d,
  default: $$TreeMenu,
  file: $$file$d,
  url: $$url$d
}, Symbol.toStringTag, { value: "Module" }));
function root_page(url2) {
  let str = String(url2);
  if (str.includes("//")) {
    str = str.split("//")[1];
  }
  if (str.includes("/")) {
    str = str.split("/")[1];
  } else {
    str = "";
  }
  return `/${str}`;
}
function url_path(url2) {
  let str = String(url2);
  if (str.includes("//")) {
    str = str.split("//")[1];
  }
  if (str.includes("/")) {
    const start2 = str.indexOf("/") + 1;
    str = str.substring(start2);
  } else {
    str = "";
  }
  return `/${str}`;
}
function active_page(url2, raw_menu2) {
  const page = root_page(url2);
  let active_page_index = raw_menu2.map((item) => item.href).indexOf(page);
  if (active_page_index == -1) {
    active_page_index = 0;
  }
  return active_page_index;
}
function active_subpage(url2, submenu) {
  const path = url_path(url2);
  let res_index = -1;
  submenu.forEach((element, index) => {
    if (path.startsWith(element.href)) {
      res_index = index;
    }
  });
  return res_index;
}
function process_menu_list(url2, raw_menu2) {
  let side_menu = { items: [], visible: false };
  const active_section_index = active_page(url2, raw_menu2);
  side_menu.visible = "items" in raw_menu2[active_section_index];
  if (side_menu.visible == false) {
    return side_menu;
  }
  side_menu.items = raw_menu2[active_section_index].items;
  const active_subpage_index = active_subpage(url2, side_menu.items);
  side_menu.items.forEach((item, index) => {
    item.classes = index == active_subpage_index ? "active" : "";
    item.paddingLeft = item.depth ? item.depth * 10 + 10 : 10;
  });
  return side_menu;
}
function set_classes_recursive(url2, items) {
  items.forEach((item) => {
    item.active = url_path(url2) == item.href;
    if ("items" in item) {
      item.parent = true;
      item.expanded = true;
      set_classes_recursive(url2, item.items);
    }
  });
}
function process_menu_tree(url2, raw_menu2) {
  let side_menu = { items: [], visible: false };
  const active_section_index = active_page(url2, raw_menu2);
  side_menu.visible = "items" in raw_menu2[active_section_index];
  if (side_menu.visible == false) {
    return side_menu;
  }
  side_menu.items = raw_menu2[active_section_index].items;
  set_classes_recursive(url2, side_menu.items);
  return side_menu;
}
function find_parent(index, headings) {
  const element_depth = headings[index].depth;
  if (index == 0) {
    return null;
  } else {
    for (let rev_i = index - 1; rev_i >= 0; rev_i--) {
      if (headings[rev_i].depth < element_depth) {
        return headings[rev_i];
      }
    }
  }
}
function heading_list_to_tree(headings) {
  for (let element of headings) {
    element.items = [];
    element.parent = true;
    element.expanded = true;
    element.href = `#${element.slug}`;
  }
  let tree = [];
  for (let index = 0; index < headings.length; index++) {
    let element = headings[index];
    let parent = find_parent(index, headings);
    if (parent) {
      parent.items.push(element);
    } else {
      tree.push(element);
    }
  }
  for (let element of headings) {
    if (element.items.length == 0) {
      element.parent = false;
      delete element.items;
      delete element.expanded;
    }
  }
  return tree;
}
function process_toc_list(headings) {
  if (typeof headings == "undefined" || headings.length == 0) {
    return { items: [], visible: false };
  }
  let side_menu = { items: [], visible: false };
  side_menu.items = heading_list_to_tree(headings);
  side_menu.visible = true;
  return side_menu;
}
var $$module4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  process_menu_list,
  process_menu_tree,
  process_toc_list
}, Symbol.toStringTag, { value: "Module" }));
var $$metadata$c = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/Layout.astro", { modules: [{ module: $$module1$2, specifier: "./AppBar.astro", assert: {} }, { module: $$module2$1, specifier: "./TreeMenu.astro", assert: {} }, { module: $$module3, specifier: "../config/menu.json", assert: {} }, { module: $$module4, specifier: "../components/menu_utils", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [{ type: "inline", value: `
	
	function configure_nav(fixed_el,resize_el,nav_el,left_to_right){
		fixed_el.addEventListener("click",(e)=>{
			const current_state = nav_el.getAttribute("data-state")
			if(current_state == "open"){
				nav_el.setAttribute("data-state","closed")
				nav_el.style.width = "0vw"
			}else if(current_state == "closed"){
				nav_el.setAttribute("data-state","open")
				nav_el.style.width = nav_el.getAttribute("data-width")
			}
			e.preventDefault()
		})

		var global_resize_state = false
		var x_down
		var start_width
		
		function finish_mouse(){
			global_resize_state = false
			nav_el.style.transition = "width 0.5s"
		if(nav_el.clientWidth < 20){
			nav_el.setAttribute("data-state","closed")
			nav_el.setAttribute("data-width","20vw")
		}else{
			nav_el.setAttribute("data-state","open")
		}
		resize_el.style.backgroundColor = "#1E1E1E"
		}
		
		resize_el.addEventListener("mouseenter",(e)=>{
			resize_el.style.backgroundColor = "#007ACC"
		})
		resize_el.addEventListener("mouseleave",(e)=>{
			resize_el.style.backgroundColor = "#1E1E1E"
		})
		resize_el.addEventListener("mousedown",(e)=>{
			global_resize_state = true
			x_down = e.x
			start_width = nav_el.clientWidth
			nav_el.style.transition = "none"
		})
		resize_el.addEventListener("mouseup",(e)=>{
			finish_mouse()
		})
		document.addEventListener("mouseup",(e)=>{
			if(global_resize_state == true){
				finish_mouse()
			}
		})
		document.addEventListener("mousemove",(e)=>{
			if(global_resize_state == true){
				const new_width = left_to_right?(start_width + e.x - x_down):(start_width - e.x + x_down)
				if(new_width <= 60){//snap effect
					nav_el.style.width = "0px"
					nav_el.setAttribute("data-width","0px")
					resize_el.style.backgroundColor = "#007ACC"
				}else if(new_width < 160){
					//do nothing here
				}else if(new_width < (document.documentElement.clientWidth)*0.4){
					nav_el.style.width = new_width+"px"
					nav_el.setAttribute("data-width",new_width+"px")
					resize_el.style.backgroundColor = "#007ACC"
				}else{
					resize_el.style.backgroundColor = "red"
				}
				e.preventDefault()
			}
		})
	}
	
	const fixed_left = document.getElementById("fixed-left")
	if(fixed_left.classList.contains("active")){
		const resize_left = document.getElementById("resize-left")
		const nav = resize_left.previousElementSibling
		configure_nav(fixed_left,resize_left,nav,true)
	}
	const fixed_right = document.getElementById("fixed-right")
	if(fixed_right.classList.contains("active")){
		const resize_right = document.getElementById("resize-right")
		const nav = resize_right.nextElementSibling
		configure_nav(fixed_right,resize_right,nav,false)
	}

` }] });
var $$Astro$d = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/Layout.astro", "http://localhost/", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
var $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Layout;
  const { headings } = Astro2.props;
  const { title } = Astro2.props.frontmatter || Astro2.props;
  const left_nav_menu = process_menu_tree(Astro2.url, raw_menu);
  const right_toc_menu = process_toc_list(headings);
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`<html lang="en" class="astro-YYTSPCVC">
	<head>
		<meta charset="utf-8">
		<link rel="icon" type="image/svg+xml" href="/favicon.svg">
		<meta name="viewport" content="width=device-width">
		<meta name="generator"${addAttribute(Astro2.generator, "content")}>
		<title>${title}</title>
	${renderHead($$result)}</head>
	<body class="astro-YYTSPCVC">
		<div id="fixed-left"${addAttribute(`fixed-nav ${left_nav_menu.visible ? "active" : ""} astro-YYTSPCVC`, "class")}></div>
		<div class="appbar-nav_content-footer astro-YYTSPCVC">
			<header class="astro-YYTSPCVC">
				${renderComponent($$result, "AppBar", $$AppBar, { "class": "astro-YYTSPCVC" })}
			</header>
			<main class="astro-YYTSPCVC">
				${left_nav_menu.visible && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "class": "astro-YYTSPCVC" }, { "default": () => renderTemplate`${renderComponent($$result, "TreeMenu", $$TreeMenu, { "items": left_nav_menu.items, "class": "astro-YYTSPCVC" })}<div id="resize-left" class="nav-resize active astro-YYTSPCVC"></div>` })}`}
	 			<article class="content astro-YYTSPCVC">
					${renderSlot($$result, $$slots["default"])}
				</article>
				${right_toc_menu.visible && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "class": "astro-YYTSPCVC" }, { "default": () => renderTemplate`<div id="resize-right" class="nav-resize active astro-YYTSPCVC"></div>${renderComponent($$result, "TreeMenu", $$TreeMenu, { "items": right_toc_menu.items, "class": "astro-YYTSPCVC" })}` })}`}
			</main>
			<footer class="astro-YYTSPCVC">
				<p class="astro-YYTSPCVC">footer</p>
			</footer>
		</div>
		<div id="fixed-right"${addAttribute(`fixed-nav ${right_toc_menu.visible ? "active" : ""} astro-YYTSPCVC`, "class")}></div>
	

<style>
	.content * > a{
			color:#3794FF;
	}

</style>

${maybeRenderHead($$result)}
</body></html>`;
});
var $$file$c = "D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/Layout.astro";
var $$url$c = void 0;
var $$module1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$c,
  default: $$Layout,
  file: $$file$c,
  url: $$url$c
}, Symbol.toStringTag, { value: "Module" }));
var html$2 = '<h1 id="astro_nav_menus">astro_nav_menus</h1>\n<p>Live demo : <a href="https://astro-nav-menus.deno.dev/">https://astro-nav-menus.deno.dev/</a></p>\n<p>Astro Theme that can scale for big documentation websites. Includes a top appbar for sections navigation, left tree menu for section pages and right tree menu for a page table of content.</p>\n<p>Performance oriented, built with native astro components, no dependencies to any extenal framework, no virtual dom. Fully static with no client side rendering. Javascript is for minial manipulations connecting events and classes.</p>\n<h2 id="features">Features</h2>\n<ul>\n<li>astro components (.astro) html css js</li>\n<li>article content immediatly searchable with native browser search, no lazy loading or custom content cache manipulations</li>\n<li>Left Menu pages Tree Navigation</li>\n<li>Right Menu Table of Content</li>\n<li>Menus consist of Trees with unlimited depth and recursively expandable sections</li>\n<li>Menus can be opened, closed and resized by the user</li>\n<li>Menus are built by astro and seen as readable html by the client</li>\n<li>markdown\n<ul>\n<li>Supports md and mdx</li>\n<li>Right Menu ToC for src/pages markdown</li>\n<li>Right Menu ToC for imported <code>import *</code> markdown</li>\n</ul>\n</li>\n</ul>\n<h1 id="dev">Dev</h1>\n<h2 id="creation">Creation</h2>\n<pre is:raw="" class="astro-code" style="background-color: #0d1117; overflow-x: auto;"><code><span class="line"><span style="color: #c9d1d9">pnpm create astro@latest</span></span></code></pre>\n<ul>\n<li>Name, Empty Project, No Typescript</li>\n<li>move to root git repo</li>\n<li>delete node_modules</li>\n</ul>\n<pre is:raw="" class="astro-code" style="background-color: #0d1117; overflow-x: auto;"><code><span class="line"><span style="color: #c9d1d9">pnpm install</span></span>\n<span class="line"><span style="color: #c9d1d9">pnpm astro add deno</span></span></code></pre>\n<ul>\n<li>add deno and server config to <code>astro.config.mjs</code></li>\n<li>prepare <code>.github/workflows/deploy.yml</code></li>\n</ul>\n<h2 id="todos">Todos</h2>\n<ul>\n<li>panzoom component</li>\n<li>gallery</li>\n<li>add href links icons to markdown</li>\n<li>menu auto depth adjust (all level or nothins)</li>\n<li>menu depth slider</li>\n<li>left menu, directory without index should have action on full area</li>\n<li>AppBar right float icons</li>\n<li>ssr mode signin with github</li>\n<li>pages types and icons</li>\n<li>open close on nav-resize click</li>\n<li>store nav menu width / prevent reset on same page reload</li>\n<li>left nav menu generation from getStaticPaths</li>\n</ul>\n<h2 id="thoughts">Thoughts</h2>\n<ul>\n<li>allow index pages but do not use them to keep consistent nav menu of folders/items</li>\n<li>adding interactive SVGs that can be styled with css is challenging\n<ul>\n<li><code>svg.astro</code> uses the innerHTML fragment which breaks visibility of <code>style</code> tag no longer scoping imported SVG</li>\n<li>import of <code>rightarrow.astro</code> still requires style to be either global or inline</li>\n<li>Tree menu collapse transition :\n<ul>\n<li>display block/none does not animate the height</li>\n<li>scaleY does not bring the height down to 0 due to remaining padding margin</li>\n<li>height can be animated but must be set initially</li>\n<li>max-height can be animated but must be set to max value which breaks the transition timing</li>\n<li>max-height adjusting with js requires high complexity depending on state of expanded children hierarchy</li>\n<li>clip also needs defined start stop</li>\n<li>flex can also animate but then the flex container height must be set explicitely</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n<h1 id="survey">survey</h1>\n<p>Analysis of existing Themes for Astro, focus is on documentation</p>\n<h2 id="astro-docs">astro docs</h2>\n<p><a href="https://github.com/withastro/astro/tree/main/examples/docs">https://github.com/withastro/astro/tree/main/examples/docs</a></p>\n<p>Advantages :</p>\n<p>Official example, clean html structure, light and dark toggle, left side pages and right side Table Of Content.</p>\n<p>Limitations :</p>\n<ul>\n<li>react and preact dependencies, despite island architecture this can exclude potential use cases</li>\n<li>Left Menu\n<ul>\n<li>handcoded <code>SIDEBAR</code> in <code>config.ts</code></li>\n<li>first level is map and not list so relying on ordered map</li>\n<li>fixed 2 levels structure</li>\n</ul>\n</li>\n<li>ToC is dynamically parsing the DOM on client side, this reduces astro\u2019s advantage of zero js and server side generation and rendering</li>\n<li>ToC does not take h1 and limited down to h4</li>\n</ul>\n<h2 id="hello-astro">hello astro</h2>\n<p><a href="https://github.com/hellotham/hello-astro">https://github.com/hellotham/hello-astro</a></p>\n<p>built upon astro-docs with differences :</p>\n<ul>\n<li>\n<p>advantage : right side ToC is not DOM client side like astro-docs but built with native astro component taking the <code>headings</code> Markdown Layout Prop <a href="https://docs.astro.build/en/guides/markdown-content/#markdown-layout-props">https://docs.astro.build/en/guides/markdown-content/#markdown-layout-props</a></p>\n</li>\n<li>\n<p>limitation: all svg integrations are either hardcoded or wrapped in images through svgimg</p>\n</li>\n</ul>';
var frontmatter$3 = {};
var file$3 = "D:/Dev/MicroWebStacks/astro_nav_menus/readme.md";
var url$3 = void 0;
function rawContent$3() {
  return "# astro_nav_menus\n\nLive demo : https://astro-nav-menus.deno.dev/\n\nAstro Theme that can scale for big documentation websites. Includes a top appbar for sections navigation, left tree menu for section pages and right tree menu for a page table of content.\n\nPerformance oriented, built with native astro components, no dependencies to any extenal framework, no virtual dom. Fully static with no client side rendering. Javascript is for minial manipulations connecting events and classes.\n## Features\n- astro components (.astro) html css js\n- article content immediatly searchable with native browser search, no lazy loading or custom content cache manipulations\n- Left Menu pages Tree Navigation\n- Right Menu Table of Content\n- Menus consist of Trees with unlimited depth and recursively expandable sections\n- Menus can be opened, closed and resized by the user\n- Menus are built by astro and seen as readable html by the client\n- markdown \n  - Supports md and mdx\n  - Right Menu ToC for src/pages markdown\n  - Right Menu ToC for imported `import *` markdown\n\n# Dev\n## Creation\n```\npnpm create astro@latest\n```\n - Name, Empty Project, No Typescript\n - move to root git repo\n - delete node_modules\n```\npnpm install\npnpm astro add deno\n```\n - add deno and server config to `astro.config.mjs`\n - prepare `.github/workflows/deploy.yml`\n\n## Todos\n- panzoom component\n- gallery\n- add href links icons to markdown\n- menu auto depth adjust (all level or nothins)\n- menu depth slider\n- left menu, directory without index should have action on full area\n- AppBar right float icons\n- ssr mode signin with github\n- pages types and icons\n- open close on nav-resize click\n- store nav menu width / prevent reset on same page reload\n- left nav menu generation from getStaticPaths\n\n## Thoughts\n- allow index pages but do not use them to keep consistent nav menu of folders/items\n- adding interactive SVGs that can be styled with css is challenging\n  - `svg.astro` uses the innerHTML fragment which breaks visibility of `style` tag no longer scoping imported SVG\n  - import of `rightarrow.astro` still requires style to be either global or inline\n  - Tree menu collapse transition :\n    - display block/none does not animate the height\n    - scaleY does not bring the height down to 0 due to remaining padding margin\n    - height can be animated but must be set initially\n    - max-height can be animated but must be set to max value which breaks the transition timing\n    - max-height adjusting with js requires high complexity depending on state of expanded children hierarchy\n    - clip also needs defined start stop\n    - flex can also animate but then the flex container height must be set explicitely\n# survey\nAnalysis of existing Themes for Astro, focus is on documentation\n## astro docs\nhttps://github.com/withastro/astro/tree/main/examples/docs\n\nAdvantages :\n\nOfficial example, clean html structure, light and dark toggle, left side pages and right side Table Of Content.\n\nLimitations :\n - react and preact dependencies, despite island architecture this can exclude potential use cases\n - Left Menu\n   - handcoded `SIDEBAR` in `config.ts`\n   - first level is map and not list so relying on ordered map\n   - fixed 2 levels structure\n - ToC is dynamically parsing the DOM on client side, this reduces astro's advantage of zero js and server side generation and rendering\n - ToC does not take h1 and limited down to h4\n\n## hello astro\n\nhttps://github.com/hellotham/hello-astro\n\nbuilt upon astro-docs with differences :\n \n - advantage : right side ToC is not DOM client side like astro-docs but built with native astro component taking the `headings` Markdown Layout Prop https://docs.astro.build/en/guides/markdown-content/#markdown-layout-props\n\n - limitation: all svg integrations are either hardcoded or wrapped in images through svgimg\n";
}
function compiledContent$3() {
  return html$2;
}
function getHeadings$3() {
  return [{ "depth": 1, "slug": "astro_nav_menus", "text": "astro_nav_menus" }, { "depth": 2, "slug": "features", "text": "Features" }, { "depth": 1, "slug": "dev", "text": "Dev" }, { "depth": 2, "slug": "creation", "text": "Creation" }, { "depth": 2, "slug": "todos", "text": "Todos" }, { "depth": 2, "slug": "thoughts", "text": "Thoughts" }, { "depth": 1, "slug": "survey", "text": "survey" }, { "depth": 2, "slug": "astro-docs", "text": "astro docs" }, { "depth": 2, "slug": "hello-astro", "text": "hello astro" }];
}
function getHeaders$2() {
  console.warn("getHeaders() have been deprecated. Use getHeadings() function instead.");
  return getHeadings$3();
}
async function Content$3() {
  const { layout, ...content } = frontmatter$3;
  content.file = file$3;
  content.url = url$3;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  const contentFragment = createVNode(Fragment, { "set:html": html$2 });
  return contentFragment;
}
Content$3[Symbol.for("astro.needsHeadRendering")] = true;
var $$module2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  frontmatter: frontmatter$3,
  file: file$3,
  url: url$3,
  rawContent: rawContent$3,
  compiledContent: compiledContent$3,
  getHeadings: getHeadings$3,
  getHeaders: getHeaders$2,
  Content: Content$3,
  default: Content$3
}, Symbol.toStringTag, { value: "Module" }));
var $$metadata$b = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/index.astro", { modules: [{ module: $$module1, specifier: "@/layout/Layout.astro", assert: {} }, { module: $$module2, specifier: "../../readme.md", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
var $$Astro$c = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/index.astro", "http://localhost/", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
var $$Index$3 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Index$3;
  return renderTemplate`<!-- how to get headings and pass them as props -->${renderComponent($$result, "Layout", $$Layout, { "title": "Readme", "headings": getHeadings$3() }, { "default": () => renderTemplate`${renderComponent($$result, "Readme.Content", Content$3, {})}` })}`;
});
var $$file$b = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/index.astro";
var $$url$b = "";
var _page0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$b,
  default: $$Index$3,
  file: $$file$b,
  url: $$url$b
}, Symbol.toStringTag, { value: "Module" }));
var $$metadata$a = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/markdown/index.astro", { modules: [{ module: $$module1, specifier: "@/layout/Layout.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
var $$Astro$b = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/markdown/index.astro", "http://localhost/", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
var $$Index$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Index$2;
  const title = "Markdown";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h1>Markdown section</h1><p>This is just the landing page of the markdown section</p><p>Select a makrdwon page from the left menu to get started</p>` })}`;
});
var $$file$a = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/markdown/index.astro";
var $$url$a = "/markdown";
var _page1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$a,
  default: $$Index$2,
  file: $$file$a,
  url: $$url$a
}, Symbol.toStringTag, { value: "Module" }));
createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/svg/hamburger.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
var $$Astro$a = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/svg/hamburger.astro", "http://localhost/", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
var $$Hamburger = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Hamburger;
  return renderTemplate`${maybeRenderHead($$result)}<svg viewBox="0 0 100 80" width="25" height="25" fill="#d0d0d0">
    <rect width="100" height="20" rx="10" ry="10"></rect>
    <rect y="30" width="100" height="20" rx="10" ry="10"></rect>
    <rect y="60" width="100" height="20" rx="10" ry="10"></rect>
</svg>`;
});
var MDXLayout = async function({
  children
}) {
  const Layout = (await Promise.resolve().then(() => $$module1)).default;
  const {
    layout,
    ...content
  } = frontmatter$2;
  content.file = file$2;
  content.url = url$2;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  return createVNode(Layout, {
    file: file$2,
    url: url$2,
    content,
    frontmatter: content,
    headings: getHeadings$2(),
    "server:root": true,
    children
  });
};
var frontmatter$2 = {
  "layout": "@/layout/Layout.astro",
  "title": "MDX with Components"
};
function getHeadings$2() {
  return [{
    "depth": 1,
    "slug": "title-1",
    "text": "Title 1"
  }];
}
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "title-1",
      children: "Title 1"
    }), "\n", createVNode(_components.p, {
      children: "This is an astro component"
    }), "\n", createVNode($$Hamburger, {})]
  });
}
function MDXContent(props = {}) {
  return createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  });
}
__astro_tag_component__(getHeadings$2, "astro:jsx");
__astro_tag_component__(MDXContent, "astro:jsx");
MDXContent[Symbol.for("astro.needsHeadRendering")] = !Boolean(frontmatter$2.layout);
var url$2 = "/markdown/components";
var file$2 = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/markdown/components.mdx";
function rawContent$2() {
  throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins");
}
function compiledContent$2() {
  throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins");
}
var Content$2 = MDXContent;
var _page2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  frontmatter: frontmatter$2,
  getHeadings: getHeadings$2,
  default: MDXContent,
  url: url$2,
  file: file$2,
  rawContent: rawContent$2,
  compiledContent: compiledContent$2,
  Content: Content$2
}, Symbol.toStringTag, { value: "Module" }));
var html$1 = '<h1 id="title-1">Title 1</h1>\n<h2 id="smaller-title">Smaller Title</h2>\n<p>Teext describing the paragraph content</p>\n<h2 id="another-small-title">Another small title</h2>\n<p>1</p>\n<p>2</p>\n<p>3</p>\n<p>4</p>\n<p>5</p>\n<p>6</p>\n<p>7</p>\n<p>8</p>\n<p>9</p>\n<p>10</p>\n<h2 id="3rd-small-title">3rd small title</h2>\n<p>1</p>\n<p>2</p>\n<p>3</p>\n<p>4</p>\n<p>5</p>\n<p>6</p>\n<p>7</p>\n<p>8</p>\n<p>9</p>\n<p>10</p>\n<p>11</p>\n<p>12</p>\n<p>13</p>\n<p>14</p>\n<p>15</p>\n<p>16</p>\n<h1 id="big-section-2">Big section 2</h1>\n<h2 id="smaller-title-1">Smaller Title</h2>\n<p>Teext describing the paragraph content</p>\n<h2 id="another-small-title-1">Another small title</h2>\n<p>11</p>\n<p>12</p>\n<p>13</p>\n<p>14</p>\n<p>15</p>\n<p>16</p>\n<p>17</p>\n<p>18</p>\n<p>19</p>\n<p>110</p>\n<h2 id="3rd-small-title-1">3rd small title</h2>\n<p>11</p>\n<p>12</p>\n<p>13</p>\n<p>14</p>\n<p>15</p>\n<p>16</p>\n<p>17</p>\n<p>18</p>\n<p>19</p>\n<p>110</p>\n<p>111</p>\n<p>112</p>\n<p>113</p>\n<p>114</p>\n<p>115</p>\n<p>116</p>\n<p>last</p>';
var frontmatter$1 = { "layout": "@/layout/Layout.astro", "title": "Simple Markdown!" };
var file$1 = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/markdown/hello.md";
var url$1 = "/markdown/hello";
function rawContent$1() {
  return "# Title 1\r\n## Smaller Title\r\nTeext describing the paragraph content\r\n## Another small title\r\n\r\n1\r\n\r\n2\r\n\r\n3\r\n\r\n4\r\n\r\n5\r\n\r\n6\r\n\r\n7\r\n\r\n8\r\n\r\n9\r\n\r\n10\r\n## 3rd small title\r\n\r\n1\r\n\r\n2\r\n\r\n3\r\n\r\n4\r\n\r\n5\r\n\r\n6\r\n\r\n7\r\n\r\n8\r\n\r\n9\r\n\r\n10\r\n\r\n11\r\n\r\n12\r\n\r\n13\r\n\r\n14\r\n\r\n15\r\n\r\n16\r\n\r\n# Big section 2\r\n## Smaller Title\r\nTeext describing the paragraph content\r\n## Another small title\r\n\r\n11\r\n\r\n12\r\n\r\n13\r\n\r\n14\r\n\r\n15\r\n\r\n16\r\n\r\n17\r\n\r\n18\r\n\r\n19\r\n\r\n110\r\n## 3rd small title\r\n\r\n11\r\n\r\n12\r\n\r\n13\r\n\r\n14\r\n\r\n15\r\n\r\n16\r\n\r\n17\r\n\r\n18\r\n\r\n19\r\n\r\n110\r\n\r\n111\r\n\r\n112\r\n\r\n113\r\n\r\n114\r\n\r\n115\r\n\r\n116\r\n\r\nlast\r\n";
}
function compiledContent$1() {
  return html$1;
}
function getHeadings$1() {
  return [{ "depth": 1, "slug": "title-1", "text": "Title 1" }, { "depth": 2, "slug": "smaller-title", "text": "Smaller Title" }, { "depth": 2, "slug": "another-small-title", "text": "Another small title" }, { "depth": 2, "slug": "3rd-small-title", "text": "3rd small title" }, { "depth": 1, "slug": "big-section-2", "text": "Big section 2" }, { "depth": 2, "slug": "smaller-title-1", "text": "Smaller Title" }, { "depth": 2, "slug": "another-small-title-1", "text": "Another small title" }, { "depth": 2, "slug": "3rd-small-title-1", "text": "3rd small title" }];
}
function getHeaders$1() {
  console.warn("getHeaders() have been deprecated. Use getHeadings() function instead.");
  return getHeadings$1();
}
async function Content$1() {
  const { layout, ...content } = frontmatter$1;
  content.file = file$1;
  content.url = url$1;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  const contentFragment = createVNode(Fragment, { "set:html": html$1 });
  return createVNode($$Layout, {
    file: file$1,
    url: url$1,
    content,
    frontmatter: content,
    headings: getHeadings$1(),
    rawContent: rawContent$1,
    compiledContent: compiledContent$1,
    "server:root": true,
    children: contentFragment
  });
}
Content$1[Symbol.for("astro.needsHeadRendering")] = false;
var _page3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  frontmatter: frontmatter$1,
  file: file$1,
  url: url$1,
  rawContent: rawContent$1,
  compiledContent: compiledContent$1,
  getHeadings: getHeadings$1,
  getHeaders: getHeaders$1,
  Content: Content$1,
  default: Content$1
}, Symbol.toStringTag, { value: "Module" }));
var html = '<h1 id="title-1">Title 1</h1>\n<p>here is a code section</p>\n<pre is:raw="" class="astro-code" style="background-color: #0d1117; overflow-x: auto;"><code><span class="line"><span style="color: #FF7B72">for</span><span style="color: #C9D1D9"> key,val </span><span style="color: #FF7B72">in</span><span style="color: #C9D1D9"> members.item():</span></span>\n<span class="line"><span style="color: #C9D1D9">    </span><span style="color: #79C0FF">print</span><span style="color: #C9D1D9">(</span><span style="color: #FF7B72">f</span><span style="color: #A5D6FF">"</span><span style="color: #79C0FF">{</span><span style="color: #C9D1D9">key</span><span style="color: #79C0FF">}</span><span style="color: #A5D6FF"> has </span><span style="color: #79C0FF">{</span><span style="color: #C9D1D9">val.info</span><span style="color: #79C0FF">}</span><span style="color: #A5D6FF">"</span><span style="color: #C9D1D9">)</span></span></code></pre>\n<p>more explanation after the code</p>';
var frontmatter = { "layout": "@/layout/Layout.astro", "title": "Code Highlight" };
var file = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/markdown/code.md";
var url = "/markdown/code";
function rawContent() {
  return '# Title 1\r\nhere is a code section\r\n```python\r\nfor key,val in members.item():\r\n    print(f"{key} has {val.info}")\r\n```\r\nmore explanation after the code\r\n';
}
function compiledContent() {
  return html;
}
function getHeadings() {
  return [{ "depth": 1, "slug": "title-1", "text": "Title 1" }];
}
function getHeaders() {
  console.warn("getHeaders() have been deprecated. Use getHeadings() function instead.");
  return getHeadings();
}
async function Content() {
  const { layout, ...content } = frontmatter;
  content.file = file;
  content.url = url;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }
  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }
  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }
  });
  const contentFragment = createVNode(Fragment, { "set:html": html });
  return createVNode($$Layout, {
    file,
    url,
    content,
    frontmatter: content,
    headings: getHeadings(),
    rawContent,
    compiledContent,
    "server:root": true,
    children: contentFragment
  });
}
Content[Symbol.for("astro.needsHeadRendering")] = false;
var _page4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  frontmatter,
  file,
  url,
  rawContent,
  compiledContent,
  getHeadings,
  getHeaders,
  Content,
  default: Content
}, Symbol.toStringTag, { value: "Module" }));
var $$metadata$9 = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/domain1/subpage1.astro", { modules: [{ module: $$module1, specifier: "@/layout/Layout.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
var $$Astro$9 = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/domain1/subpage1.astro", "http://localhost/", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
var $$Subpage1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Subpage1;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sub Page 1" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<p>I'm in sub page 1</p>` })}`;
});
var $$file$9 = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/domain1/subpage1.astro";
var $$url$9 = "/domain1/subpage1";
var _page5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$9,
  default: $$Subpage1,
  file: $$file$9,
  url: $$url$9
}, Symbol.toStringTag, { value: "Module" }));
var $$metadata$8 = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/domain1/subpage2.astro", { modules: [{ module: $$module1, specifier: "@/layout/Layout.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
var $$Astro$8 = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/domain1/subpage2.astro", "http://localhost/", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
var $$Subpage2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Subpage2;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sub Page 2" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<p>I'm in sub page 2</p>` })}`;
});
var $$file$8 = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/domain1/subpage2.astro";
var $$url$8 = "/domain1/subpage2";
var _page6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$8,
  default: $$Subpage2,
  file: $$file$8,
  url: $$url$8
}, Symbol.toStringTag, { value: "Module" }));
var $$metadata$7 = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/domain2/index.astro", { modules: [{ module: $$module1, specifier: "@/layout/Layout.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
var $$Astro$7 = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/domain2/index.astro", "http://localhost/", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
var $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Index$1;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Domain 2" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<p>I'm in Domain 2</p>` })}`;
});
var $$file$7 = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/domain2/index.astro";
var $$url$7 = "/domain2";
var _page7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$7,
  default: $$Index$1,
  file: $$file$7,
  url: $$url$7
}, Symbol.toStringTag, { value: "Module" }));
var $$metadata$6 = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/domain2/subdomain2/index.astro", { modules: [{ module: $$module1, specifier: "@/layout/Layout.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
var $$Astro$6 = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/domain2/subdomain2/index.astro", "http://localhost/", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sub Domain 2" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<p>I'm in Sub Domain 2 index</p>` })}`;
});
var $$file$6 = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/domain2/subdomain2/index.astro";
var $$url$6 = "/domain2/subdomain2";
var _page8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$6,
  default: $$Index,
  file: $$file$6,
  url: $$url$6
}, Symbol.toStringTag, { value: "Module" }));
var $$metadata$5 = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/domain2/subdomain2/spage5.astro", { modules: [{ module: $$module1, specifier: "@/layout/Layout.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
var $$Astro$5 = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/domain2/subdomain2/spage5.astro", "http://localhost/", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
var $$Spage5 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Spage5;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "S Page 5" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<p>I'm in s page 5</p>` })}`;
});
var $$file$5 = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/domain2/subdomain2/spage5.astro";
var $$url$5 = "/domain2/subdomain2/spage5";
var _page9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$5,
  default: $$Spage5,
  file: $$file$5,
  url: $$url$5
}, Symbol.toStringTag, { value: "Module" }));
var $$metadata$4 = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/domain2/subpage4.astro", { modules: [{ module: $$module1, specifier: "@/layout/Layout.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
var $$Astro$4 = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/domain2/subpage4.astro", "http://localhost/", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
var $$Subpage4 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Subpage4;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sub Page 4" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<p>I'm in sub page 4</p>` })}`;
});
var $$file$4 = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/domain2/subpage4.astro";
var $$url$4 = "/domain2/subpage4";
var _page10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$4,
  default: $$Subpage4,
  file: $$file$4,
  url: $$url$4
}, Symbol.toStringTag, { value: "Module" }));
var $$metadata$3 = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/about.astro", { modules: [{ module: $$module1, specifier: "../layout/Layout.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
var $$Astro$3 = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/about.astro", "http://localhost/", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
var $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$About;
  const title = "About";
  console.log("Hello About");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h1>About</h1><a>This is 'About' page</a>` })}`;
});
var $$file$3 = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/about.astro";
var $$url$3 = "/about";
var _page11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$3,
  default: $$About,
  file: $$file$3,
  url: $$url$3
}, Symbol.toStringTag, { value: "Module" }));
var $$metadata$2 = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/page1.astro", { modules: [{ module: $$module1, specifier: "../layout/Layout.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
var $$Astro$2 = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/page1.astro", "http://localhost/", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
var $$Page1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Page1;
  const title = "Astro Nav Menus";
  console.log("Hello from Server");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h1>Demo Home</h1><p>index page</p>${new Array(100).fill(0).map((id, index) => renderTemplate`<div>${index}</div>`)}` })}`;
});
var $$file$2 = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/page1.astro";
var $$url$2 = "/page1";
var _page12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$2,
  default: $$Page1,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: "Module" }));
var $$metadata$1 = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/page2.astro", { modules: [{ module: $$module1, specifier: "@/layout/Layout.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
var $$Astro$1 = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/page2.astro", "http://localhost/", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
var $$Page2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Page2;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Page 2" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<p>I'm in page 2</p>` })}`;
});
var $$file$1 = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/page2.astro";
var $$url$1 = "/page2";
var _page13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$1,
  default: $$Page2,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: "Module" }));
var $$metadata = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/page3.astro", { modules: [{ module: $$module1, specifier: "@/layout/Layout.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
var $$Astro = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/page3.astro", "http://localhost/", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
var $$Page3 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Page3;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Page 3" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<p>I'm in page 3</p>` })}`;
});
var $$file = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/page3.astro";
var $$url = "/page3";
var _page14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  $$metadata,
  default: $$Page3,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
var pageMap = /* @__PURE__ */ new Map([["src/pages/index.astro", _page0], ["src/pages/markdown/index.astro", _page1], ["src/pages/markdown/components.mdx", _page2], ["src/pages/markdown/hello.md", _page3], ["src/pages/markdown/code.md", _page4], ["src/pages/domain1/subpage1.astro", _page5], ["src/pages/domain1/subpage2.astro", _page6], ["src/pages/domain2/index.astro", _page7], ["src/pages/domain2/subdomain2/index.astro", _page8], ["src/pages/domain2/subdomain2/spage5.astro", _page9], ["src/pages/domain2/subpage4.astro", _page10], ["src/pages/about.astro", _page11], ["src/pages/page1.astro", _page12], ["src/pages/page2.astro", _page13], ["src/pages/page3.astro", _page14]]);
var renderers = [Object.assign({ "name": "astro:jsx", "serverEntrypoint": "astro/jsx/server.js", "jsxImportSource": "astro" }, { ssr: server_default })];
var _manifest = Object.assign(deserializeManifest({ "adapterName": "@astrojs/deno", "routes": [{ "file": "", "links": ["assets/107d9fe3.fa023734.css"], "scripts": [{ "type": "inline", "value": 'function f(s,e,t,g){s.addEventListener("click",i=>{const n=t.getAttribute("data-state");n=="open"?(t.setAttribute("data-state","closed"),t.style.width="0vw"):n=="closed"&&(t.setAttribute("data-state","open"),t.style.width=t.getAttribute("data-width")),i.preventDefault()});var d=!1,o,r;function a(){d=!1,t.style.transition="width 0.5s",t.clientWidth<20?(t.setAttribute("data-state","closed"),t.setAttribute("data-width","20vw")):t.setAttribute("data-state","open"),e.style.backgroundColor="#1E1E1E"}e.addEventListener("mouseenter",i=>{e.style.backgroundColor="#007ACC"}),e.addEventListener("mouseleave",i=>{e.style.backgroundColor="#1E1E1E"}),e.addEventListener("mousedown",i=>{d=!0,o=i.x,r=t.clientWidth,t.style.transition="none"}),e.addEventListener("mouseup",i=>{a()}),document.addEventListener("mouseup",i=>{d==!0&&a()}),document.addEventListener("mousemove",i=>{if(d==!0){const n=g?r+i.x-o:r-i.x+o;n<=60?(t.style.width="0px",t.setAttribute("data-width","0px"),e.style.backgroundColor="#007ACC"):n<160||(n<document.documentElement.clientWidth*.4?(t.style.width=n+"px",t.setAttribute("data-width",n+"px"),e.style.backgroundColor="#007ACC"):e.style.backgroundColor="red"),i.preventDefault()}})}const u=document.getElementById("fixed-left");if(u.classList.contains("active")){const s=document.getElementById("resize-left"),e=s.previousElementSibling;f(u,s,e,!0)}const c=document.getElementById("fixed-right");if(c.classList.contains("active")){const s=document.getElementById("resize-right"),e=s.nextElementSibling;f(c,s,e,!1)}let l=document.getElementsByClassName("parent");for(let s=0;s<l.length;s++)l[s].addEventListener("click",function(e){this.parentElement.parentElement.querySelector("ul")?.classList.toggle("hidden"),this.classList.toggle("expanded"),e.preventDefault()});\n' }], "routeData": { "route": "/", "type": "page", "pattern": "^\\/$", "segments": [], "params": [], "component": "src/pages/index.astro", "pathname": "/", "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": ["assets/107d9fe3.fa023734.css"], "scripts": [{ "type": "inline", "value": 'function f(s,e,t,g){s.addEventListener("click",i=>{const n=t.getAttribute("data-state");n=="open"?(t.setAttribute("data-state","closed"),t.style.width="0vw"):n=="closed"&&(t.setAttribute("data-state","open"),t.style.width=t.getAttribute("data-width")),i.preventDefault()});var d=!1,o,r;function a(){d=!1,t.style.transition="width 0.5s",t.clientWidth<20?(t.setAttribute("data-state","closed"),t.setAttribute("data-width","20vw")):t.setAttribute("data-state","open"),e.style.backgroundColor="#1E1E1E"}e.addEventListener("mouseenter",i=>{e.style.backgroundColor="#007ACC"}),e.addEventListener("mouseleave",i=>{e.style.backgroundColor="#1E1E1E"}),e.addEventListener("mousedown",i=>{d=!0,o=i.x,r=t.clientWidth,t.style.transition="none"}),e.addEventListener("mouseup",i=>{a()}),document.addEventListener("mouseup",i=>{d==!0&&a()}),document.addEventListener("mousemove",i=>{if(d==!0){const n=g?r+i.x-o:r-i.x+o;n<=60?(t.style.width="0px",t.setAttribute("data-width","0px"),e.style.backgroundColor="#007ACC"):n<160||(n<document.documentElement.clientWidth*.4?(t.style.width=n+"px",t.setAttribute("data-width",n+"px"),e.style.backgroundColor="#007ACC"):e.style.backgroundColor="red"),i.preventDefault()}})}const u=document.getElementById("fixed-left");if(u.classList.contains("active")){const s=document.getElementById("resize-left"),e=s.previousElementSibling;f(u,s,e,!0)}const c=document.getElementById("fixed-right");if(c.classList.contains("active")){const s=document.getElementById("resize-right"),e=s.nextElementSibling;f(c,s,e,!1)}let l=document.getElementsByClassName("parent");for(let s=0;s<l.length;s++)l[s].addEventListener("click",function(e){this.parentElement.parentElement.querySelector("ul")?.classList.toggle("hidden"),this.classList.toggle("expanded"),e.preventDefault()});\n' }], "routeData": { "route": "/markdown", "type": "page", "pattern": "^\\/markdown\\/?$", "segments": [[{ "content": "markdown", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/markdown/index.astro", "pathname": "/markdown", "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": ["assets/107d9fe3.fa023734.css"], "scripts": [{ "type": "inline", "value": 'function f(s,e,t,g){s.addEventListener("click",i=>{const n=t.getAttribute("data-state");n=="open"?(t.setAttribute("data-state","closed"),t.style.width="0vw"):n=="closed"&&(t.setAttribute("data-state","open"),t.style.width=t.getAttribute("data-width")),i.preventDefault()});var d=!1,o,r;function a(){d=!1,t.style.transition="width 0.5s",t.clientWidth<20?(t.setAttribute("data-state","closed"),t.setAttribute("data-width","20vw")):t.setAttribute("data-state","open"),e.style.backgroundColor="#1E1E1E"}e.addEventListener("mouseenter",i=>{e.style.backgroundColor="#007ACC"}),e.addEventListener("mouseleave",i=>{e.style.backgroundColor="#1E1E1E"}),e.addEventListener("mousedown",i=>{d=!0,o=i.x,r=t.clientWidth,t.style.transition="none"}),e.addEventListener("mouseup",i=>{a()}),document.addEventListener("mouseup",i=>{d==!0&&a()}),document.addEventListener("mousemove",i=>{if(d==!0){const n=g?r+i.x-o:r-i.x+o;n<=60?(t.style.width="0px",t.setAttribute("data-width","0px"),e.style.backgroundColor="#007ACC"):n<160||(n<document.documentElement.clientWidth*.4?(t.style.width=n+"px",t.setAttribute("data-width",n+"px"),e.style.backgroundColor="#007ACC"):e.style.backgroundColor="red"),i.preventDefault()}})}const u=document.getElementById("fixed-left");if(u.classList.contains("active")){const s=document.getElementById("resize-left"),e=s.previousElementSibling;f(u,s,e,!0)}const c=document.getElementById("fixed-right");if(c.classList.contains("active")){const s=document.getElementById("resize-right"),e=s.nextElementSibling;f(c,s,e,!1)}let l=document.getElementsByClassName("parent");for(let s=0;s<l.length;s++)l[s].addEventListener("click",function(e){this.parentElement.parentElement.querySelector("ul")?.classList.toggle("hidden"),this.classList.toggle("expanded"),e.preventDefault()});\n' }], "routeData": { "route": "/markdown/components", "type": "page", "pattern": "^\\/markdown\\/components\\/?$", "segments": [[{ "content": "markdown", "dynamic": false, "spread": false }], [{ "content": "components", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/markdown/components.mdx", "pathname": "/markdown/components", "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": ["assets/107d9fe3.fa023734.css"], "scripts": [{ "type": "inline", "value": 'function f(s,e,t,g){s.addEventListener("click",i=>{const n=t.getAttribute("data-state");n=="open"?(t.setAttribute("data-state","closed"),t.style.width="0vw"):n=="closed"&&(t.setAttribute("data-state","open"),t.style.width=t.getAttribute("data-width")),i.preventDefault()});var d=!1,o,r;function a(){d=!1,t.style.transition="width 0.5s",t.clientWidth<20?(t.setAttribute("data-state","closed"),t.setAttribute("data-width","20vw")):t.setAttribute("data-state","open"),e.style.backgroundColor="#1E1E1E"}e.addEventListener("mouseenter",i=>{e.style.backgroundColor="#007ACC"}),e.addEventListener("mouseleave",i=>{e.style.backgroundColor="#1E1E1E"}),e.addEventListener("mousedown",i=>{d=!0,o=i.x,r=t.clientWidth,t.style.transition="none"}),e.addEventListener("mouseup",i=>{a()}),document.addEventListener("mouseup",i=>{d==!0&&a()}),document.addEventListener("mousemove",i=>{if(d==!0){const n=g?r+i.x-o:r-i.x+o;n<=60?(t.style.width="0px",t.setAttribute("data-width","0px"),e.style.backgroundColor="#007ACC"):n<160||(n<document.documentElement.clientWidth*.4?(t.style.width=n+"px",t.setAttribute("data-width",n+"px"),e.style.backgroundColor="#007ACC"):e.style.backgroundColor="red"),i.preventDefault()}})}const u=document.getElementById("fixed-left");if(u.classList.contains("active")){const s=document.getElementById("resize-left"),e=s.previousElementSibling;f(u,s,e,!0)}const c=document.getElementById("fixed-right");if(c.classList.contains("active")){const s=document.getElementById("resize-right"),e=s.nextElementSibling;f(c,s,e,!1)}let l=document.getElementsByClassName("parent");for(let s=0;s<l.length;s++)l[s].addEventListener("click",function(e){this.parentElement.parentElement.querySelector("ul")?.classList.toggle("hidden"),this.classList.toggle("expanded"),e.preventDefault()});\n' }], "routeData": { "route": "/markdown/hello", "type": "page", "pattern": "^\\/markdown\\/hello\\/?$", "segments": [[{ "content": "markdown", "dynamic": false, "spread": false }], [{ "content": "hello", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/markdown/hello.md", "pathname": "/markdown/hello", "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": ["assets/107d9fe3.fa023734.css"], "scripts": [{ "type": "inline", "value": 'function f(s,e,t,g){s.addEventListener("click",i=>{const n=t.getAttribute("data-state");n=="open"?(t.setAttribute("data-state","closed"),t.style.width="0vw"):n=="closed"&&(t.setAttribute("data-state","open"),t.style.width=t.getAttribute("data-width")),i.preventDefault()});var d=!1,o,r;function a(){d=!1,t.style.transition="width 0.5s",t.clientWidth<20?(t.setAttribute("data-state","closed"),t.setAttribute("data-width","20vw")):t.setAttribute("data-state","open"),e.style.backgroundColor="#1E1E1E"}e.addEventListener("mouseenter",i=>{e.style.backgroundColor="#007ACC"}),e.addEventListener("mouseleave",i=>{e.style.backgroundColor="#1E1E1E"}),e.addEventListener("mousedown",i=>{d=!0,o=i.x,r=t.clientWidth,t.style.transition="none"}),e.addEventListener("mouseup",i=>{a()}),document.addEventListener("mouseup",i=>{d==!0&&a()}),document.addEventListener("mousemove",i=>{if(d==!0){const n=g?r+i.x-o:r-i.x+o;n<=60?(t.style.width="0px",t.setAttribute("data-width","0px"),e.style.backgroundColor="#007ACC"):n<160||(n<document.documentElement.clientWidth*.4?(t.style.width=n+"px",t.setAttribute("data-width",n+"px"),e.style.backgroundColor="#007ACC"):e.style.backgroundColor="red"),i.preventDefault()}})}const u=document.getElementById("fixed-left");if(u.classList.contains("active")){const s=document.getElementById("resize-left"),e=s.previousElementSibling;f(u,s,e,!0)}const c=document.getElementById("fixed-right");if(c.classList.contains("active")){const s=document.getElementById("resize-right"),e=s.nextElementSibling;f(c,s,e,!1)}let l=document.getElementsByClassName("parent");for(let s=0;s<l.length;s++)l[s].addEventListener("click",function(e){this.parentElement.parentElement.querySelector("ul")?.classList.toggle("hidden"),this.classList.toggle("expanded"),e.preventDefault()});\n' }], "routeData": { "route": "/markdown/code", "type": "page", "pattern": "^\\/markdown\\/code\\/?$", "segments": [[{ "content": "markdown", "dynamic": false, "spread": false }], [{ "content": "code", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/markdown/code.md", "pathname": "/markdown/code", "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": ["assets/107d9fe3.fa023734.css"], "scripts": [{ "type": "inline", "value": 'function f(s,e,t,g){s.addEventListener("click",i=>{const n=t.getAttribute("data-state");n=="open"?(t.setAttribute("data-state","closed"),t.style.width="0vw"):n=="closed"&&(t.setAttribute("data-state","open"),t.style.width=t.getAttribute("data-width")),i.preventDefault()});var d=!1,o,r;function a(){d=!1,t.style.transition="width 0.5s",t.clientWidth<20?(t.setAttribute("data-state","closed"),t.setAttribute("data-width","20vw")):t.setAttribute("data-state","open"),e.style.backgroundColor="#1E1E1E"}e.addEventListener("mouseenter",i=>{e.style.backgroundColor="#007ACC"}),e.addEventListener("mouseleave",i=>{e.style.backgroundColor="#1E1E1E"}),e.addEventListener("mousedown",i=>{d=!0,o=i.x,r=t.clientWidth,t.style.transition="none"}),e.addEventListener("mouseup",i=>{a()}),document.addEventListener("mouseup",i=>{d==!0&&a()}),document.addEventListener("mousemove",i=>{if(d==!0){const n=g?r+i.x-o:r-i.x+o;n<=60?(t.style.width="0px",t.setAttribute("data-width","0px"),e.style.backgroundColor="#007ACC"):n<160||(n<document.documentElement.clientWidth*.4?(t.style.width=n+"px",t.setAttribute("data-width",n+"px"),e.style.backgroundColor="#007ACC"):e.style.backgroundColor="red"),i.preventDefault()}})}const u=document.getElementById("fixed-left");if(u.classList.contains("active")){const s=document.getElementById("resize-left"),e=s.previousElementSibling;f(u,s,e,!0)}const c=document.getElementById("fixed-right");if(c.classList.contains("active")){const s=document.getElementById("resize-right"),e=s.nextElementSibling;f(c,s,e,!1)}let l=document.getElementsByClassName("parent");for(let s=0;s<l.length;s++)l[s].addEventListener("click",function(e){this.parentElement.parentElement.querySelector("ul")?.classList.toggle("hidden"),this.classList.toggle("expanded"),e.preventDefault()});\n' }], "routeData": { "route": "/domain1/subpage1", "type": "page", "pattern": "^\\/domain1\\/subpage1\\/?$", "segments": [[{ "content": "domain1", "dynamic": false, "spread": false }], [{ "content": "subpage1", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/domain1/subpage1.astro", "pathname": "/domain1/subpage1", "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": ["assets/107d9fe3.fa023734.css"], "scripts": [{ "type": "inline", "value": 'function f(s,e,t,g){s.addEventListener("click",i=>{const n=t.getAttribute("data-state");n=="open"?(t.setAttribute("data-state","closed"),t.style.width="0vw"):n=="closed"&&(t.setAttribute("data-state","open"),t.style.width=t.getAttribute("data-width")),i.preventDefault()});var d=!1,o,r;function a(){d=!1,t.style.transition="width 0.5s",t.clientWidth<20?(t.setAttribute("data-state","closed"),t.setAttribute("data-width","20vw")):t.setAttribute("data-state","open"),e.style.backgroundColor="#1E1E1E"}e.addEventListener("mouseenter",i=>{e.style.backgroundColor="#007ACC"}),e.addEventListener("mouseleave",i=>{e.style.backgroundColor="#1E1E1E"}),e.addEventListener("mousedown",i=>{d=!0,o=i.x,r=t.clientWidth,t.style.transition="none"}),e.addEventListener("mouseup",i=>{a()}),document.addEventListener("mouseup",i=>{d==!0&&a()}),document.addEventListener("mousemove",i=>{if(d==!0){const n=g?r+i.x-o:r-i.x+o;n<=60?(t.style.width="0px",t.setAttribute("data-width","0px"),e.style.backgroundColor="#007ACC"):n<160||(n<document.documentElement.clientWidth*.4?(t.style.width=n+"px",t.setAttribute("data-width",n+"px"),e.style.backgroundColor="#007ACC"):e.style.backgroundColor="red"),i.preventDefault()}})}const u=document.getElementById("fixed-left");if(u.classList.contains("active")){const s=document.getElementById("resize-left"),e=s.previousElementSibling;f(u,s,e,!0)}const c=document.getElementById("fixed-right");if(c.classList.contains("active")){const s=document.getElementById("resize-right"),e=s.nextElementSibling;f(c,s,e,!1)}let l=document.getElementsByClassName("parent");for(let s=0;s<l.length;s++)l[s].addEventListener("click",function(e){this.parentElement.parentElement.querySelector("ul")?.classList.toggle("hidden"),this.classList.toggle("expanded"),e.preventDefault()});\n' }], "routeData": { "route": "/domain1/subpage2", "type": "page", "pattern": "^\\/domain1\\/subpage2\\/?$", "segments": [[{ "content": "domain1", "dynamic": false, "spread": false }], [{ "content": "subpage2", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/domain1/subpage2.astro", "pathname": "/domain1/subpage2", "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": ["assets/107d9fe3.fa023734.css"], "scripts": [{ "type": "inline", "value": 'function f(s,e,t,g){s.addEventListener("click",i=>{const n=t.getAttribute("data-state");n=="open"?(t.setAttribute("data-state","closed"),t.style.width="0vw"):n=="closed"&&(t.setAttribute("data-state","open"),t.style.width=t.getAttribute("data-width")),i.preventDefault()});var d=!1,o,r;function a(){d=!1,t.style.transition="width 0.5s",t.clientWidth<20?(t.setAttribute("data-state","closed"),t.setAttribute("data-width","20vw")):t.setAttribute("data-state","open"),e.style.backgroundColor="#1E1E1E"}e.addEventListener("mouseenter",i=>{e.style.backgroundColor="#007ACC"}),e.addEventListener("mouseleave",i=>{e.style.backgroundColor="#1E1E1E"}),e.addEventListener("mousedown",i=>{d=!0,o=i.x,r=t.clientWidth,t.style.transition="none"}),e.addEventListener("mouseup",i=>{a()}),document.addEventListener("mouseup",i=>{d==!0&&a()}),document.addEventListener("mousemove",i=>{if(d==!0){const n=g?r+i.x-o:r-i.x+o;n<=60?(t.style.width="0px",t.setAttribute("data-width","0px"),e.style.backgroundColor="#007ACC"):n<160||(n<document.documentElement.clientWidth*.4?(t.style.width=n+"px",t.setAttribute("data-width",n+"px"),e.style.backgroundColor="#007ACC"):e.style.backgroundColor="red"),i.preventDefault()}})}const u=document.getElementById("fixed-left");if(u.classList.contains("active")){const s=document.getElementById("resize-left"),e=s.previousElementSibling;f(u,s,e,!0)}const c=document.getElementById("fixed-right");if(c.classList.contains("active")){const s=document.getElementById("resize-right"),e=s.nextElementSibling;f(c,s,e,!1)}let l=document.getElementsByClassName("parent");for(let s=0;s<l.length;s++)l[s].addEventListener("click",function(e){this.parentElement.parentElement.querySelector("ul")?.classList.toggle("hidden"),this.classList.toggle("expanded"),e.preventDefault()});\n' }], "routeData": { "route": "/domain2", "type": "page", "pattern": "^\\/domain2\\/?$", "segments": [[{ "content": "domain2", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/domain2/index.astro", "pathname": "/domain2", "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": ["assets/107d9fe3.fa023734.css"], "scripts": [{ "type": "inline", "value": 'function f(s,e,t,g){s.addEventListener("click",i=>{const n=t.getAttribute("data-state");n=="open"?(t.setAttribute("data-state","closed"),t.style.width="0vw"):n=="closed"&&(t.setAttribute("data-state","open"),t.style.width=t.getAttribute("data-width")),i.preventDefault()});var d=!1,o,r;function a(){d=!1,t.style.transition="width 0.5s",t.clientWidth<20?(t.setAttribute("data-state","closed"),t.setAttribute("data-width","20vw")):t.setAttribute("data-state","open"),e.style.backgroundColor="#1E1E1E"}e.addEventListener("mouseenter",i=>{e.style.backgroundColor="#007ACC"}),e.addEventListener("mouseleave",i=>{e.style.backgroundColor="#1E1E1E"}),e.addEventListener("mousedown",i=>{d=!0,o=i.x,r=t.clientWidth,t.style.transition="none"}),e.addEventListener("mouseup",i=>{a()}),document.addEventListener("mouseup",i=>{d==!0&&a()}),document.addEventListener("mousemove",i=>{if(d==!0){const n=g?r+i.x-o:r-i.x+o;n<=60?(t.style.width="0px",t.setAttribute("data-width","0px"),e.style.backgroundColor="#007ACC"):n<160||(n<document.documentElement.clientWidth*.4?(t.style.width=n+"px",t.setAttribute("data-width",n+"px"),e.style.backgroundColor="#007ACC"):e.style.backgroundColor="red"),i.preventDefault()}})}const u=document.getElementById("fixed-left");if(u.classList.contains("active")){const s=document.getElementById("resize-left"),e=s.previousElementSibling;f(u,s,e,!0)}const c=document.getElementById("fixed-right");if(c.classList.contains("active")){const s=document.getElementById("resize-right"),e=s.nextElementSibling;f(c,s,e,!1)}let l=document.getElementsByClassName("parent");for(let s=0;s<l.length;s++)l[s].addEventListener("click",function(e){this.parentElement.parentElement.querySelector("ul")?.classList.toggle("hidden"),this.classList.toggle("expanded"),e.preventDefault()});\n' }], "routeData": { "route": "/domain2/subdomain2", "type": "page", "pattern": "^\\/domain2\\/subdomain2\\/?$", "segments": [[{ "content": "domain2", "dynamic": false, "spread": false }], [{ "content": "subdomain2", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/domain2/subdomain2/index.astro", "pathname": "/domain2/subdomain2", "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": ["assets/107d9fe3.fa023734.css"], "scripts": [{ "type": "inline", "value": 'function f(s,e,t,g){s.addEventListener("click",i=>{const n=t.getAttribute("data-state");n=="open"?(t.setAttribute("data-state","closed"),t.style.width="0vw"):n=="closed"&&(t.setAttribute("data-state","open"),t.style.width=t.getAttribute("data-width")),i.preventDefault()});var d=!1,o,r;function a(){d=!1,t.style.transition="width 0.5s",t.clientWidth<20?(t.setAttribute("data-state","closed"),t.setAttribute("data-width","20vw")):t.setAttribute("data-state","open"),e.style.backgroundColor="#1E1E1E"}e.addEventListener("mouseenter",i=>{e.style.backgroundColor="#007ACC"}),e.addEventListener("mouseleave",i=>{e.style.backgroundColor="#1E1E1E"}),e.addEventListener("mousedown",i=>{d=!0,o=i.x,r=t.clientWidth,t.style.transition="none"}),e.addEventListener("mouseup",i=>{a()}),document.addEventListener("mouseup",i=>{d==!0&&a()}),document.addEventListener("mousemove",i=>{if(d==!0){const n=g?r+i.x-o:r-i.x+o;n<=60?(t.style.width="0px",t.setAttribute("data-width","0px"),e.style.backgroundColor="#007ACC"):n<160||(n<document.documentElement.clientWidth*.4?(t.style.width=n+"px",t.setAttribute("data-width",n+"px"),e.style.backgroundColor="#007ACC"):e.style.backgroundColor="red"),i.preventDefault()}})}const u=document.getElementById("fixed-left");if(u.classList.contains("active")){const s=document.getElementById("resize-left"),e=s.previousElementSibling;f(u,s,e,!0)}const c=document.getElementById("fixed-right");if(c.classList.contains("active")){const s=document.getElementById("resize-right"),e=s.nextElementSibling;f(c,s,e,!1)}let l=document.getElementsByClassName("parent");for(let s=0;s<l.length;s++)l[s].addEventListener("click",function(e){this.parentElement.parentElement.querySelector("ul")?.classList.toggle("hidden"),this.classList.toggle("expanded"),e.preventDefault()});\n' }], "routeData": { "route": "/domain2/subdomain2/spage5", "type": "page", "pattern": "^\\/domain2\\/subdomain2\\/spage5\\/?$", "segments": [[{ "content": "domain2", "dynamic": false, "spread": false }], [{ "content": "subdomain2", "dynamic": false, "spread": false }], [{ "content": "spage5", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/domain2/subdomain2/spage5.astro", "pathname": "/domain2/subdomain2/spage5", "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": ["assets/107d9fe3.fa023734.css"], "scripts": [{ "type": "inline", "value": 'function f(s,e,t,g){s.addEventListener("click",i=>{const n=t.getAttribute("data-state");n=="open"?(t.setAttribute("data-state","closed"),t.style.width="0vw"):n=="closed"&&(t.setAttribute("data-state","open"),t.style.width=t.getAttribute("data-width")),i.preventDefault()});var d=!1,o,r;function a(){d=!1,t.style.transition="width 0.5s",t.clientWidth<20?(t.setAttribute("data-state","closed"),t.setAttribute("data-width","20vw")):t.setAttribute("data-state","open"),e.style.backgroundColor="#1E1E1E"}e.addEventListener("mouseenter",i=>{e.style.backgroundColor="#007ACC"}),e.addEventListener("mouseleave",i=>{e.style.backgroundColor="#1E1E1E"}),e.addEventListener("mousedown",i=>{d=!0,o=i.x,r=t.clientWidth,t.style.transition="none"}),e.addEventListener("mouseup",i=>{a()}),document.addEventListener("mouseup",i=>{d==!0&&a()}),document.addEventListener("mousemove",i=>{if(d==!0){const n=g?r+i.x-o:r-i.x+o;n<=60?(t.style.width="0px",t.setAttribute("data-width","0px"),e.style.backgroundColor="#007ACC"):n<160||(n<document.documentElement.clientWidth*.4?(t.style.width=n+"px",t.setAttribute("data-width",n+"px"),e.style.backgroundColor="#007ACC"):e.style.backgroundColor="red"),i.preventDefault()}})}const u=document.getElementById("fixed-left");if(u.classList.contains("active")){const s=document.getElementById("resize-left"),e=s.previousElementSibling;f(u,s,e,!0)}const c=document.getElementById("fixed-right");if(c.classList.contains("active")){const s=document.getElementById("resize-right"),e=s.nextElementSibling;f(c,s,e,!1)}let l=document.getElementsByClassName("parent");for(let s=0;s<l.length;s++)l[s].addEventListener("click",function(e){this.parentElement.parentElement.querySelector("ul")?.classList.toggle("hidden"),this.classList.toggle("expanded"),e.preventDefault()});\n' }], "routeData": { "route": "/domain2/subpage4", "type": "page", "pattern": "^\\/domain2\\/subpage4\\/?$", "segments": [[{ "content": "domain2", "dynamic": false, "spread": false }], [{ "content": "subpage4", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/domain2/subpage4.astro", "pathname": "/domain2/subpage4", "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": ["assets/107d9fe3.fa023734.css"], "scripts": [{ "type": "inline", "value": 'function f(s,e,t,g){s.addEventListener("click",i=>{const n=t.getAttribute("data-state");n=="open"?(t.setAttribute("data-state","closed"),t.style.width="0vw"):n=="closed"&&(t.setAttribute("data-state","open"),t.style.width=t.getAttribute("data-width")),i.preventDefault()});var d=!1,o,r;function a(){d=!1,t.style.transition="width 0.5s",t.clientWidth<20?(t.setAttribute("data-state","closed"),t.setAttribute("data-width","20vw")):t.setAttribute("data-state","open"),e.style.backgroundColor="#1E1E1E"}e.addEventListener("mouseenter",i=>{e.style.backgroundColor="#007ACC"}),e.addEventListener("mouseleave",i=>{e.style.backgroundColor="#1E1E1E"}),e.addEventListener("mousedown",i=>{d=!0,o=i.x,r=t.clientWidth,t.style.transition="none"}),e.addEventListener("mouseup",i=>{a()}),document.addEventListener("mouseup",i=>{d==!0&&a()}),document.addEventListener("mousemove",i=>{if(d==!0){const n=g?r+i.x-o:r-i.x+o;n<=60?(t.style.width="0px",t.setAttribute("data-width","0px"),e.style.backgroundColor="#007ACC"):n<160||(n<document.documentElement.clientWidth*.4?(t.style.width=n+"px",t.setAttribute("data-width",n+"px"),e.style.backgroundColor="#007ACC"):e.style.backgroundColor="red"),i.preventDefault()}})}const u=document.getElementById("fixed-left");if(u.classList.contains("active")){const s=document.getElementById("resize-left"),e=s.previousElementSibling;f(u,s,e,!0)}const c=document.getElementById("fixed-right");if(c.classList.contains("active")){const s=document.getElementById("resize-right"),e=s.nextElementSibling;f(c,s,e,!1)}let l=document.getElementsByClassName("parent");for(let s=0;s<l.length;s++)l[s].addEventListener("click",function(e){this.parentElement.parentElement.querySelector("ul")?.classList.toggle("hidden"),this.classList.toggle("expanded"),e.preventDefault()});\n' }], "routeData": { "route": "/about", "type": "page", "pattern": "^\\/about\\/?$", "segments": [[{ "content": "about", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/about.astro", "pathname": "/about", "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": ["assets/107d9fe3.fa023734.css"], "scripts": [{ "type": "inline", "value": 'function f(s,e,t,g){s.addEventListener("click",i=>{const n=t.getAttribute("data-state");n=="open"?(t.setAttribute("data-state","closed"),t.style.width="0vw"):n=="closed"&&(t.setAttribute("data-state","open"),t.style.width=t.getAttribute("data-width")),i.preventDefault()});var d=!1,o,r;function a(){d=!1,t.style.transition="width 0.5s",t.clientWidth<20?(t.setAttribute("data-state","closed"),t.setAttribute("data-width","20vw")):t.setAttribute("data-state","open"),e.style.backgroundColor="#1E1E1E"}e.addEventListener("mouseenter",i=>{e.style.backgroundColor="#007ACC"}),e.addEventListener("mouseleave",i=>{e.style.backgroundColor="#1E1E1E"}),e.addEventListener("mousedown",i=>{d=!0,o=i.x,r=t.clientWidth,t.style.transition="none"}),e.addEventListener("mouseup",i=>{a()}),document.addEventListener("mouseup",i=>{d==!0&&a()}),document.addEventListener("mousemove",i=>{if(d==!0){const n=g?r+i.x-o:r-i.x+o;n<=60?(t.style.width="0px",t.setAttribute("data-width","0px"),e.style.backgroundColor="#007ACC"):n<160||(n<document.documentElement.clientWidth*.4?(t.style.width=n+"px",t.setAttribute("data-width",n+"px"),e.style.backgroundColor="#007ACC"):e.style.backgroundColor="red"),i.preventDefault()}})}const u=document.getElementById("fixed-left");if(u.classList.contains("active")){const s=document.getElementById("resize-left"),e=s.previousElementSibling;f(u,s,e,!0)}const c=document.getElementById("fixed-right");if(c.classList.contains("active")){const s=document.getElementById("resize-right"),e=s.nextElementSibling;f(c,s,e,!1)}let l=document.getElementsByClassName("parent");for(let s=0;s<l.length;s++)l[s].addEventListener("click",function(e){this.parentElement.parentElement.querySelector("ul")?.classList.toggle("hidden"),this.classList.toggle("expanded"),e.preventDefault()});\n' }], "routeData": { "route": "/page1", "type": "page", "pattern": "^\\/page1\\/?$", "segments": [[{ "content": "page1", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/page1.astro", "pathname": "/page1", "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": ["assets/107d9fe3.fa023734.css"], "scripts": [{ "type": "inline", "value": 'function f(s,e,t,g){s.addEventListener("click",i=>{const n=t.getAttribute("data-state");n=="open"?(t.setAttribute("data-state","closed"),t.style.width="0vw"):n=="closed"&&(t.setAttribute("data-state","open"),t.style.width=t.getAttribute("data-width")),i.preventDefault()});var d=!1,o,r;function a(){d=!1,t.style.transition="width 0.5s",t.clientWidth<20?(t.setAttribute("data-state","closed"),t.setAttribute("data-width","20vw")):t.setAttribute("data-state","open"),e.style.backgroundColor="#1E1E1E"}e.addEventListener("mouseenter",i=>{e.style.backgroundColor="#007ACC"}),e.addEventListener("mouseleave",i=>{e.style.backgroundColor="#1E1E1E"}),e.addEventListener("mousedown",i=>{d=!0,o=i.x,r=t.clientWidth,t.style.transition="none"}),e.addEventListener("mouseup",i=>{a()}),document.addEventListener("mouseup",i=>{d==!0&&a()}),document.addEventListener("mousemove",i=>{if(d==!0){const n=g?r+i.x-o:r-i.x+o;n<=60?(t.style.width="0px",t.setAttribute("data-width","0px"),e.style.backgroundColor="#007ACC"):n<160||(n<document.documentElement.clientWidth*.4?(t.style.width=n+"px",t.setAttribute("data-width",n+"px"),e.style.backgroundColor="#007ACC"):e.style.backgroundColor="red"),i.preventDefault()}})}const u=document.getElementById("fixed-left");if(u.classList.contains("active")){const s=document.getElementById("resize-left"),e=s.previousElementSibling;f(u,s,e,!0)}const c=document.getElementById("fixed-right");if(c.classList.contains("active")){const s=document.getElementById("resize-right"),e=s.nextElementSibling;f(c,s,e,!1)}let l=document.getElementsByClassName("parent");for(let s=0;s<l.length;s++)l[s].addEventListener("click",function(e){this.parentElement.parentElement.querySelector("ul")?.classList.toggle("hidden"),this.classList.toggle("expanded"),e.preventDefault()});\n' }], "routeData": { "route": "/page2", "type": "page", "pattern": "^\\/page2\\/?$", "segments": [[{ "content": "page2", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/page2.astro", "pathname": "/page2", "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": ["assets/107d9fe3.fa023734.css"], "scripts": [{ "type": "inline", "value": 'function f(s,e,t,g){s.addEventListener("click",i=>{const n=t.getAttribute("data-state");n=="open"?(t.setAttribute("data-state","closed"),t.style.width="0vw"):n=="closed"&&(t.setAttribute("data-state","open"),t.style.width=t.getAttribute("data-width")),i.preventDefault()});var d=!1,o,r;function a(){d=!1,t.style.transition="width 0.5s",t.clientWidth<20?(t.setAttribute("data-state","closed"),t.setAttribute("data-width","20vw")):t.setAttribute("data-state","open"),e.style.backgroundColor="#1E1E1E"}e.addEventListener("mouseenter",i=>{e.style.backgroundColor="#007ACC"}),e.addEventListener("mouseleave",i=>{e.style.backgroundColor="#1E1E1E"}),e.addEventListener("mousedown",i=>{d=!0,o=i.x,r=t.clientWidth,t.style.transition="none"}),e.addEventListener("mouseup",i=>{a()}),document.addEventListener("mouseup",i=>{d==!0&&a()}),document.addEventListener("mousemove",i=>{if(d==!0){const n=g?r+i.x-o:r-i.x+o;n<=60?(t.style.width="0px",t.setAttribute("data-width","0px"),e.style.backgroundColor="#007ACC"):n<160||(n<document.documentElement.clientWidth*.4?(t.style.width=n+"px",t.setAttribute("data-width",n+"px"),e.style.backgroundColor="#007ACC"):e.style.backgroundColor="red"),i.preventDefault()}})}const u=document.getElementById("fixed-left");if(u.classList.contains("active")){const s=document.getElementById("resize-left"),e=s.previousElementSibling;f(u,s,e,!0)}const c=document.getElementById("fixed-right");if(c.classList.contains("active")){const s=document.getElementById("resize-right"),e=s.nextElementSibling;f(c,s,e,!1)}let l=document.getElementsByClassName("parent");for(let s=0;s<l.length;s++)l[s].addEventListener("click",function(e){this.parentElement.parentElement.querySelector("ul")?.classList.toggle("hidden"),this.classList.toggle("expanded"),e.preventDefault()});\n' }], "routeData": { "route": "/page3", "type": "page", "pattern": "^\\/page3\\/?$", "segments": [[{ "content": "page3", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/page3.astro", "pathname": "/page3", "_meta": { "trailingSlash": "ignore" } } }], "site": "http://localhost/", "base": "/", "markdown": { "drafts": false, "syntaxHighlight": "shiki", "shikiConfig": { "langs": [], "theme": "github-dark", "wrap": false }, "remarkPlugins": [], "rehypePlugins": [], "remarkRehype": {}, "extendDefaultPlugins": false, "isAstroFlavoredMd": false }, "pageMap": null, "renderers": [], "entryModules": { "\0@astrojs-ssr-virtual-entry": "entry.mjs", "/astro/hoisted.js?q=0": "hoisted.445970fc.js", "astro:scripts/before-hydration.js": "" }, "assets": ["/assets/107d9fe3.fa023734.css", "/favicon.svg"] }), {
  pageMap,
  renderers
});
var _args = { "port": 3e3, "hostname": "localhost" };
var _exports = createExports(_manifest, _args);
var stop = _exports["stop"];
var handle = _exports["handle"];
var start = _exports["start"];
var running = _exports["running"];
var _start = "start";
if (_start in adapter) {
  adapter[_start](_manifest, _args);
}
export {
  handle,
  running,
  start,
  stop
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
