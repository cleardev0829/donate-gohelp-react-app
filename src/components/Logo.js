import PropTypes from "prop-types";
// material
import { useTheme } from "@material-ui/core/styles";
import { experimentalStyled as styled } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object,
};

export default function Logo({ sx, type = "default" }) {
  const theme = useTheme();

  return (
    <Box sx={{ overflow: "hidden" }}>
      {/* {type === "default" ? (
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          // xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="39px"
          height="39px"
          viewBox="0 0 39 39"
          enableBackground="new 0 0 39 39"
          // xml:space="preserve"
        >
          <image
            id="image0"
            width="39"
            height="39"
            x="0"
            y="0"
            href="data:image/png;base64,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
AABJRU5ErkJggg=="
          />
        </svg>
      ) : (
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="39px"
          height="39px"
          viewBox="0 0 39 39"
          enableBackground="new 0 0 39 39"
        >
          <image
            id="image0"
            width="39"
            height="39"
            x="0"
            y="0"
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAQAAAAmqpm+AAAABGdBTUEAALGPC/xhBQAAACBjSFJN
AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZ
cwAACxMAAAsTAQCanBgAAAAHdElNRQfmAwoIMxNaEr3dAAAD8ElEQVRIx52WWWxVVRSGv91WCxig
UChRQCAMweJAGOIDxmoiRiREUBKMCJggiBKgTtHEOgVF0QphMDhhosRgSQoISjQgVo2BBMWgFCk0
FgEhylDgQVOGfj7c09tzB+SW9XDv3v/617/XOmvvs0+gDWYxi2hmF9/xc7AtkdnESlznDeBQn3OD
b3uH4fLFiv3KgbF5Hydb5SY7Xo5YP7+0bwZaaY3j2y7W368tScOCy33Ifla2Vew6t1mUhnXzY0cD
uCaOF+SgV8ZxltnIRrYk+mkvFlAZfgHghEXhVFvkdtAlvGY/hrPGJr6hjgpmhQORdzfD2JpbmZMs
s8CObkgi+d7uVm+Mccosz02s3F1Wu84RrvbKGP6w98ZmXa1uneVdVOxl2jGZPWFC+JG9POhKH3EI
ADVc38oLJ+l0STlf5UJ4nXoGAPAt7XmCQyz2agj13BxjzqcmM7yPHZLjApf7aDSush1Y6CoAZybK
tMpCANu70BlgccuubMluG3WJ42I7qtgaVkT4HvpDaKLEzsB2Ek3Yy0gwn+XsCe/bm/28F88tz2Z1
FIBveH9Kb2cAeJvrrHaMnwB4kxUWutqxAM5W6+PZFRGAMgCO8Wdspe2MBAg1YQITOUiwg0/TlTI+
483wBQDDgZRiE2+F3gD8Smmsb3/QNzk21LKPUjYzinzKw87I0RO4ytamOlg1sX8Mro0Ve4/rrXa1
Uy2Nin48o407VO0ELYcs8Ts4kYPJg+c8+ofxYCG3Ms2h1PE9ZSxOEevMwFaNgljJ11gS/gYOOyTU
gi+QF+YChCY2sxkcxDS6pCVXSufWSUKoOWpILwA2cje4iMbwUlpoMQOYkIb1iP7PtyY8SNWjiZe3
Ja73U8dlPKOxrjAtN4N3eUQ1dqq9VtVJnrLeO8Gf/MARaYFTXJmxwFSP2+B09UIcLlJ1uqrnvM8O
jnaB613qLRHjKZeY9m60wnPqecvVk6kpN6nL3K7q2ZbrxMHOcaMbfMsXMzJ71oRVWa3Wpjp3qo1O
9Yyqp5wd8/VwTIbY/EjssPNUfSfV/YyqDZFTdcnFblCL3BJxGh3nUVVT+22e+1Td5RyPReQGJ2YR
m5n0H3SKDap+nknrGzX8dyd5IJnjwhROd1clPbU+5klV6+yZrYgB7lf1tA/EBJfEGFuSaL1PekHV
H+yW/aFgdzepesJZEVl1WOSdnET+cZbnVF3K/5n5Vkar/5sMjjaJ7yaRxij757m0+ZGp1iK3Mg1/
JTM22002l6NZ10nl7g4VOcmF06zNKpd6yD689IotdiIHzpnc5c7mwDmfDcxObc4BzcrJ/kF2iN+4
gjzyOE9z8qI8Qh350Vj+yhb4Hxbj7fGCYyqdAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTAzLTEw
VDA4OjUxOjE5KzAwOjAwm5izxAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0wMy0xMFQwODo1MTox
OSswMDowMOrFC3gAAAAASUVORK5CYII="
          />
        </svg>
      )} */}

      <img
        src="/favicon/PNG/GO HELP.png"
        style={{
          width: 200,
          objectFit: "cover",
        }}
      />
    </Box>
  );
}
