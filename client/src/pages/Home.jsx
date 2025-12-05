import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

export default function Home({ user }) {
  return (
    <div>
      <h1>Девчонки, мальчишки, читайте книжки</h1>

      {user && (
        <Link to="/reader">
          <button>Книжка</button>
        </Link>
      )}
    </div>
  );
}
