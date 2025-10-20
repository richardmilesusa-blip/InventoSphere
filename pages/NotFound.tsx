
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import PageWrapper from '../components/layout/PageWrapper';

const NotFound: React.FC = () => {
  return (
    <PageWrapper className="flex items-center justify-center h-full">
      <div className="text-center">
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">404</h1>
        <p className="text-2xl font-bold tracking-tight text-gray-100 sm:text-4xl">
          Page Not Found
        </p>
        <p className="mt-4 text-gray-400">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Link to="/">
          <Button className="mt-6">Go back home</Button>
        </Link>
      </div>
    </PageWrapper>
  );
};

export default NotFound;
