import React from 'react';

interface ResetPasswordProps {
  name?: string;
  resetUrl: string;
  expiredTime: number;
}

export function ResetPassswordEmail({
  name,
  resetUrl,
  expiredTime = 5,
}: ResetPasswordProps): React.JSX.Element {
  return (
    <div
      style={{
        background: '#0A0A0A',
        color: '#FAFAFA',
        padding: '40px 24px',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '520px',
          margin: '0 auto',
          background: '#111111',
          border: '1px solid #222',
          borderRadius: '24px',
          padding: '40px',
        }}
      >
        {/* BRAND */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '48px',
          }}
        >
          <img
            src="TODO"
            alt="Photoloop"
            width="34"
            height="34"
            style={{
              display: 'inline-block',
              verticalAlign: 'middle',
              marginRight: '10px',
              borderRadius: '8px',
            }}
          />

          <span
            style={{
              color: '#FAFAFA',
              fontSize: '24px',
              fontWeight: 400,
              letterSpacing: '-0.04em',
              lineHeight: '34px',
              verticalAlign: 'middle',
              display: 'inline-block',
            }}
          >
            Photoloop
          </span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: '36px',
            lineHeight: '42px',
            fontWeight: 700,
            marginTop: 0,
            marginBottom: '18px',
            letterSpacing: '-0.05em',
            textAlign: 'center',
            color: '#FAFAFA',
          }}
        >
          Reset your password
        </h1>

        {/* Description */}
        <p
          style={{
            color: '#A1A1AA',
            lineHeight: 1.8,
            fontSize: '16px',
            marginBottom: '36px',
            textAlign: 'center',
          }}
        >
          {name ? `Hey ${name},` : 'Hey there,'}
          <br />
          <br />
          We received a request to reset the password for your Photoloop
          account.
          <br />
          <br />
          Click the button below to create a new password.
        </p>

        {/* Reset Button */}
        <div
          style={{
            background: '#181818',
            border: '1px solid #2A2A2A',
            borderRadius: '20px',
            padding: '24px',
            textAlign: 'center',
            marginBottom: '24px',
            boxShadow: 'inset 0 0 0 1px #2A2A2A',
          }}
        >
          <a
            href={resetUrl}
            style={{
              display: 'inline-block',
              color: '#FAFAFA',
              textDecoration: 'none',
              fontSize: '20px',
              fontWeight: 700,
            }}
          >
            Reset password
          </a>
        </div>

        {/* Expiration */}
        <p
          style={{
            color: '#71717A',
            fontSize: '14px',
            marginBottom: '28px',
            textAlign: 'center',
          }}
        >
          This reset link expires in {expiredTime} minutes.
        </p>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: '#222',
            margin: '36px 0 28px',
          }}
        />

        {/* Footer */}
        <p
          style={{
            color: '#71717A',
            fontSize: '13px',
            lineHeight: 1.7,
            margin: 0,
            textAlign: 'center',
          }}
        >
          If you didn&apos;t request a password reset, you can safely ignore
          this email.
        </p>
      </div>
    </div>
  );
}
