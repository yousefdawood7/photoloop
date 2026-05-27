import React from 'react';

interface EmailTemplateProps {
  name?: string;
  otp?: string;
  magicLink?: string;
  variant: 'otp' | 'magic-link';
}

export function EmailTemplate({
  name,
  otp,
  magicLink,
  variant,
}: EmailTemplateProps): React.JSX.Element {
  const isOtp = variant === 'otp';

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
            // Replace after deploying
            src="YOUR_LOGO_URL"
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
          {isOtp ? 'Verify your email' : 'Sign in to Photoloop'}
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
          {name
            ? `Hey ${name},`
            : isOtp
              ? 'Welcome to Photoloop.'
              : 'Welcome back.'}

          <br />
          <br />

          {isOtp
            ? 'Use the verification code below to continue creating your account.'
            : 'Click the button below to securely sign in to your account.'}
        </p>

        {/* OTP */}
        {isOtp && otp && (
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
            <p
              style={{
                fontSize: '42px',
                letterSpacing: '0.22em',
                fontWeight: 700,
                margin: 0,
                color: '#FAFAFA',
              }}
            >
              {otp.split('').join(' ')}
            </p>
          </div>
        )}

        {/* Magic Link */}
        {!isOtp && magicLink && (
          <div
            style={{
              textAlign: 'center',
              marginBottom: '24px',
            }}
          >
            <a
              href={magicLink}
              style={{
                background: '#FAFAFA',
                color: '#0A0A0A',
                padding: '14px 28px',
                borderRadius: '14px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '15px',
                display: 'inline-block',
              }}
            >
              Sign in to Photoloop
            </a>
          </div>
        )}

        {/* Expiration */}
        <p
          style={{
            color: '#71717A',
            fontSize: '14px',
            marginBottom: '28px',
            textAlign: 'center',
          }}
        >
          This {isOtp ? 'code' : 'magic link'} expires in 10 minutes.
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
          If you didn’t create a Photoloop account, you can safely ignore this
          email.
        </p>
      </div>
    </div>
  );
}
