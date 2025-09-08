import DiscountAndPromotionComponent from "../../Components/DiscountAndPromotionComponent/DiscountAndPromotionComponent";

const DiscountAndPromotion = () => {
  return (
    <div
      style={{
        background: "var(--background-gradient)",
        color: "var(--text-dark)",
        height: "100dvh",
        width: "100dvw",
        padding: "12px",
      }}
    >
      <DiscountAndPromotionComponent />
    </div>
  );
};

export default DiscountAndPromotion;
