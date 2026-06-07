import React from 'react';

interface AlreadySignedUpEmailTemplateProps {
  name?: string;
}

export function AlreadySignedUpEmailTemplate({
  name,
}: AlreadySignedUpEmailTemplateProps): React.JSX.Element {
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
            src="TODO" // TODO SETUP THROUGH TUNNEL OR AFTER DEPLOYMENT
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
          Account already exists
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
          It looks like a Photoloop account has already been created using this
          email address.
          <br />
          <br />
          If this was you, simply sign in using your existing account.
        </p>

        {/* Info Box */}
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
              margin: 0,
              color: '#D4D4D8',
              fontSize: '15px',
              lineHeight: 1.7,
            }}
          >
            No further action is required.
          </p>
        </div>

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
          If you didn't attempt to create an account, you can safely ignore this
          email.
        </p>
      </div>
    </div>
  );
}
