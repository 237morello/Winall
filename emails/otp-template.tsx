import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface OTPEmailProps {
  otp: string;
  dureeExpirationEnMinutes?: number;
}

export const OTPEmail = ({
  otp,
  dureeExpirationEnMinutes = 5,
}: OTPEmailProps) => (
  <Html>
    <Head />
    <Preview>Votre code de verification Winall</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={section}>
          <Text style={text}>Bonjour,</Text>
          <Text style={text}>
            Voici votre code de verification a usage unique pour vous connecter a
            Winall Tech.
          </Text>
          <Section style={otpContainer}>
            <Text style={otpText}>{otp}</Text>
          </Section>
          <Text style={text}>
            Ce code expirera dans {dureeExpirationEnMinutes} minutes. Si vous
            n&apos;avez pas demande ce code, vous pouvez ignorer cet email.
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

const otpContainer = {
  background: "#f4f4f4",
  borderRadius: "4px",
  margin: "24px 0",
  padding: "16px",
  textAlign: "center" as const,
};

const otpText = {
  color: "#16a34a",
  fontSize: "32px",
  fontWeight: "bold",
  letterSpacing: "8px",
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

export default OTPEmail;
