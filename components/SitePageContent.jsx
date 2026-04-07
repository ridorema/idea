import parse from "html-react-parser";

const FACEBOOK_URL =
  "https://www.facebook.com/people/Idea-Furnitureal/100090127205163/?locale=ga_IE#";
const INSTAGRAM_URL = "https://www.instagram.com/idea.furniture.al/";
const MAPS_URL = "https://maps.app.goo.gl/2Zx3cbG2hYGXNVKA9";
const PHONE_DISPLAY = "069 209 0689";
const PHONE_HREF = "tel:0692090689";

function stripUnsafeTags(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, "");
}

function applyContentOverrides(html) {
  return html
    .replaceAll("Joe Doe", "Idea Furniture")
    .replaceAll("John Doe", "Idea Furniture")
    .replace(
      /<div class="designer">[\s\S]*?<div class="btn btn-add">[\s\S]*?<\/div>\s*<\/div>/,
      `<div class="designer">
                                <div class="box">
                                    <div class="image">
                                        <img src="/assets/images/user-1.jpg" alt="Idea Furniture" />
                                    </div>
                                    <div class="name">
                                        <div class="h3 title">Idea Furniture <small>Kontakt & social</small></div>
                                        <hr />
                                        <p><a href="${PHONE_HREF}"><i class="icon icon-phone-handset"></i> ${PHONE_DISPLAY}</a></p>
                                        <p><a href="${MAPS_URL}" target="_blank" rel="noreferrer"><i class="fa fa-map-marker"></i> Na vizitoni</a></p>
                                        <p>
                                            <a href="${FACEBOOK_URL}" target="_blank" rel="noreferrer" class="btn btn-main btn-xs"><i class="fa fa-facebook"></i></a>
                                            <a href="${INSTAGRAM_URL}" target="_blank" rel="noreferrer" class="btn btn-main btn-xs"><i class="fa fa-instagram"></i></a>
                                            <a href="${MAPS_URL}" target="_blank" rel="noreferrer" class="btn btn-main btn-xs"><i class="fa fa-map-marker"></i></a>
                                        </p>
                                    </div> <!--/name-->
                                </div> <!--/box-->
                                <div class="btn btn-add">
                                    <a href="${PHONE_HREF}" aria-label="Telefono Idea Furniture"><i class="icon icon-phone-handset"></i></a>
                                </div>
                            </div>`
    )
    .replaceAll("johndoe@mail.com", "idea.furniture.al")
    .replaceAll("+002255858", PHONE_DISPLAY)
    .replaceAll("002255858", "0692090689")
    .replace(
      /href="\/contact" class="btn btn-clean"><span class="icon icon-map-marker"><\/span> Na vizitoni<\/a>/g,
      `href="${MAPS_URL}" target="_blank" rel="noreferrer" class="btn btn-clean"><span class="icon icon-map-marker"></span> Na vizitoni</a>`
    )
    .replace(
      /<div class="call-us h4"><span class="icon icon-phone-handset"><\/span>\s*0692090689<\/div>/g,
      `<div class="call-us h4"><span class="icon icon-phone-handset"></span> ${PHONE_DISPLAY}</div>`
    )
    .replace(
      /(<div class="footer-social">[\s\S]*?<div class="col-sm-6 links">\s*<ul>)[\s\S]*?(<\/ul>)/g,
      `$1
                                <li><a href="${FACEBOOK_URL}" target="_blank" rel="noreferrer" aria-label="Facebook"><i class="fa fa-facebook"></i></a></li>
                                <li><a href="${INSTAGRAM_URL}" target="_blank" rel="noreferrer" aria-label="Instagram"><i class="fa fa-instagram"></i></a></li>
                                <li><a href="${MAPS_URL}" target="_blank" rel="noreferrer" aria-label="Google Maps"><i class="fa fa-map-marker"></i></a></li>
                            $2`
    );
}

export function SitePageContent({ page }) {
  return <>{parse(stripUnsafeTags(applyContentOverrides(page.bodyHtml)))}</>;
}
