import React from 'react';
import { JSX } from 'react/jsx-runtime';

type NewsItemProps = {
  imageUrl?: string;
  title?: string;
  description?: string;
  newsUrl?: string;
};

function NewsItem({
  imageUrl,
  title,
  description,
  newsUrl,
}: NewsItemProps): JSX.Element {
  return (
    <div>
      <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden mt-10">
        {imageUrl && (
          <img
            className="w-full h-40 object-cover"
            src={imageUrl}
            alt="Card Image"
          />
        )}
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}...</h2>
          <p className="mt-2 text-gray-600 text-sm">{description}...</p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-700 transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;