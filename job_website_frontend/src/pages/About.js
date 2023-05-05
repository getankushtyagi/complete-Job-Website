import React from 'react'

const imgtag = {
  display: "block",
  blockSize: "44px",
  marginLeft:"400px"
};
export default function About() {
  return (
    <div className="my-5 container">
      <img src="/SquareboatLogo.png" alt="" style={imgtag} /> <br />
      <h1>Overview</h1>
      <p>
        Founded in 2013, Squareboat has been consistently helping Startups and MNCs build beautiful and scalable digital products. Our main services include Web and Mobile Application Development, UI/UX Design, DevOps and Branding. Companies like Dunzo, Paisabazaar, Jubilant, PVR, and Lucideus trust us for high-quality design and development. Do visit squareboat.com
      </p>
    </div>
  )
}
