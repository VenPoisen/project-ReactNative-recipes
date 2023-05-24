import { COLORS, SIZES } from "../../constants/theme";

const styles = {
    btnContainer: {
        width: 40,
        height: 40,
        backgroundColor: "inherit",
        borderRadius: SIZES.small / 1.25,
        justifyContent: "center",
        alignItems: "center",
    },
    btnImg: (dimension) => ({
        width: dimension,
        height: dimension,
        borderRadius: SIZES.small / 1.25,
        tintColor: COLORS.primary,
    }),
};

export default styles;