import { Fragment } from "react";
import { KeystaticEntry } from "../page";
import { Container } from "react-bootstrap";
import { getContactSection } from "@/app/api/keystatic/lib/keystatic";

const Footer = async () => {
  const contactSection = await getContactSection();
  const formatTel = (tel: string) => {
    return tel.replace(/[^a-zA-Z0-9]/g, "");
  };

  const googleEmbedString = (html: string) => {
    const match = html.match(/src="([^"]+)"/);

    const url = match
      ? match[1]
      : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.1663844205364!2d-81.0173780525053!3d34.921126490165754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885688597bdf05f9%3A0x59b623a0f096e59b!2s621%20E%20Main%20St%2C%20Rock%20Hill%2C%20SC%2029730!5e0!3m2!1sen!2sus!4v1764106199037!5m2!1sen!2sus";
    return url;
  };
  return (
    <div>
      {contactSection.length > 0
        ? contactSection.map((item: KeystaticEntry, index: number) => {
            const { entry } = item;
            return (
              <Fragment key={index}>
                <section>
                  <iframe
                    src={entry.googleMapEmbeddedCode ? googleEmbedString(entry.googleMapEmbeddedCode) : ""}
                    width="100%"
                    height="450"
                    style={{ border: "0" }}
                    allowFullScreen={true}
                    loading="lazy"
                  ></iframe>
                </section>
                <section key={index} id="contact" className="section contact footer">
                  <Container>
                    <h2 className="text-center mb-5">{entry.title}</h2>
                    <div className="contact-info-container">
                      <div className="text-center">
                        <div>
                          <i className="bi bi-telephone-x"></i>
                        </div>
                        <h3 className="mb-2">Phone</h3>
                        <p>
                          <a href={`tel:${entry.phone ? formatTel(entry.phone) : entry.phone}`}>{entry.phone}</a>
                        </p>
                      </div>
                      <div className="text-center">
                        <div>
                          <i className="bi bi-envelope"></i>
                        </div>
                        <h3 className="mb-2">Email</h3>
                        <p>
                          <a href={`mailto:${entry.email}`}>{entry.email}</a>
                        </p>
                      </div>
                      <div className="text-center">
                        <div>
                          <i className="bi bi-geo-alt"></i>
                        </div>
                        <h3 className="mb-2">Location</h3>
                        <p>
                          <a href={entry.googleMapLink ? entry.googleMapLink : "https://maps.app.goo.gl/MYCHA2KRrBGrxXcC9"} target="_blank">
                            621 East Main St.
                            <br />
                            Rock Hill SC 29730
                          </a>
                        </p>
                      </div>
                    </div>
                    <p className="text-center mt-4">Visit us at rockhillspinstudio.com</p>
                  </Container>
                </section>
              </Fragment>
            );
          })
        : null}
    </div>
  );
};

export default Footer;
