import { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import _ from "lodash";
import { useDispatch, useSelector } from "../../redux/store";
import useIsMountedRef from "../../hooks/useIsMountedRef";
import useAuth from "../../hooks/useAuth";
import Page from "../../components/Page";
import {
  DonateComplete,
  DonateMain,
  DonatePayment,
} from "../../components/_external-pages/donate";
import {
  getCart,
  createBilling,
  onNextStep,
  onBackStep,
  onGotoStep,
  getDonatesById,
} from "../../redux/slices/donate";
import { getPost } from "../../redux/slices/blog";

// ----------------------------------------------------------------------

const STEPS = ["1", "2"];

export default function Donate() {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const { checkout } = useSelector((state) => state.donate);
  const { post } = useSelector((state) => state.blog);
  const { activeStep } = checkout;
  const [data, setData] = useState({});
  const isComplete = activeStep === STEPS.length;

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, activeStep]);

  useEffect(() => {
    setData(post);
  }, [post]);

  if (_.isEmpty(data)) {
    return null;
  }

  return (
    <Page
      title="Donate"
      sx={{
        paddingTop: (theme) => theme.spacing(theme.shape.PAGE_TOP_PADDING),
        paddingBottom: (theme) =>
          theme.spacing(theme.shape.PAGE_BOTTOM_PADDING),
        backgroundColor: (theme) => theme.palette.background.body,
      }}
    >
      <>
        {!isComplete ? (
          <>
            {activeStep === -1 && <DonateMain post={data} />}
            {activeStep === 0 && <DonatePayment post={data} />}
            {activeStep === 1 && <DonatePayment post={data} />}
          </>
        ) : (
          <DonateComplete open={isComplete} />
        )}
      </>
    </Page>
  );
}
