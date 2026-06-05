import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface MagicLinkEmailProps {
  url: string;
  dureeExpirationEnMinutes?: number;
}

export const MagicLinkEmail = ({
  url,
  dureeExpirationEnMinutes = 5,
}: MagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>Connectez-vous a votre espace Winall</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={section}>
          <Text style={text}>Bonjour,</Text>
          <Text style={text}>
            Cliquez sur le bouton ci-dessous pour vous connecter en toute
            securite a votre compte Winall.
          </Text>
          <Button style={button} href={url}>
            Se connecter a Winall
          </Button>
          <Text style={text}>
            Ce lien expirera dans {dureeExpirationEnMinutes} minutes et ne peut
            etre utilise qu&apos;une seule fois. Si vous n&apos;avez pas demande
            ce lien, vous pouvez ignorer cet email.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Winall Tech SARL - Electricite & Solutions Digitales
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const section = {
  padding: "0 48px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const button = {
  backgroundColor: "#16a34a",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "12px",
  marginTop: "25px",
  marginBottom: "25px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};

export default MagicLinkEmail;
