import { useSearchParams, useNavigate } from 'react-router-dom';
import { useVerifyEmailQuery } from '../Services/authService.js';
import { useEffect, useState } from 'react';
import { Card, Spinner, Button, Container } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function EmailVerification() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const ivfm = params.get('ivfm');
  const id = params.get('id');
  const [countdown, setCountdown] = useState(3);

  const { data, error, isLoading, isSuccess } = useVerifyEmailQuery(
    { ivfm, id },
    { skip: !ivfm || !id }
  );
console.log(data)
  useEffect(() => {
    if (isSuccess) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev === 1) {
            clearInterval(timer);
            navigate('/sign-up', {
              state: {
                name: data?.user?.name,
                email: data?.user?.email,
              },
            });
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [isSuccess, data, navigate]);

  const renderCard = ({ icon, title, message, variant, buttonText, buttonLink }) => (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className={`shadow-lg text-center border-${variant}`} style={{ maxWidth: '500px', width: '100%' }}>
        <Card.Body>
          <div className={`text-${variant} mb-3`} style={{ fontSize: '3rem' }}>
            {icon}
          </div>
          <Card.Title className={`text-${variant}`}>{title}</Card.Title>
          <Card.Text className="mt-2">{message}</Card.Text>
          {buttonText && (
            <Button variant={variant} href={buttonLink} className="mt-3">
              {buttonText}
            </Button>
          )}
        </Card.Body>
      </Card>
    </Container>
  );

  if (!ivfm || !id) {
    return renderCard({
      icon: <FaTimesCircle />,
      title: 'Verification Failed',
      message: 'Missing verification details.',
      variant: 'danger',
      buttonText: 'Try Again',
      buttonLink: '/sign-up',
    });
  }

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <Card className="shadow-sm text-center" style={{ maxWidth: '400px', width: '100%' }}>
          <Card.Body>
            <Spinner animation="border" variant="primary" className="mb-3" />
            <Card.Title>Verifying your email...</Card.Title>
            <Card.Text className="text-muted">Please wait while we confirm your account.</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  if (error) {
    return renderCard({
      icon: <FaTimesCircle />,
      title: 'Verification Failed',
      message: error?.data?.message || 'The link is invalid or expired.',
      variant: 'danger',
      buttonText: 'Try Again',
      buttonLink: '/sign-up',
    });
  }

  if (isSuccess) {
    return renderCard({
      icon: <FaCheckCircle />,
      title: 'Email Verified!',
      message: `Your email has been verified successfully! Redirecting in ${countdown}s...`,
      variant: 'success',
      buttonText: null,
      buttonLink: null,
    });
  }

  return null;
}