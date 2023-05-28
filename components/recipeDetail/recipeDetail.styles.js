import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = {
    scrollView: {
        height: "100%",
    },
    cardContainer: {
        backgroundColor: COLORS.lightWhite,
        margin: SIZES.medium,
        overflow: "hidden",
        borderRadius: SIZES.xxSmall,
    },
    recipeImage: {
        width: '100%',
        height: 250,
    },
    recipeDescriptionContainer: {
        padding: SIZES.medium,
    },
    recipeTitle: {
        fontSize: SIZES.large,
        fontFamily: FONT.bold,
        marginBottom: 8,
        paddingBottom: SIZES.small,
    },
    recipeAuthorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZES.medium,
    },
    recipeInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: COLORS.gray2,
        padding: SIZES.medium,
    },
    recipeInfoTextTitle: {
        fontSize: SIZES.medium,
        fontFamily: FONT.bold,
        textAlign: "center",
        color: COLORS.textDark,
    },
    recipeInfoText: {
        fontSize: SIZES.small,
        textAlign: "center",
        color: COLORS.textDark,
    },
    recipeDateText: {
        fontSize: SIZES.small,
        color: COLORS.gray,
    },
    recipeLinkableInfoText: {
        fontSize: SIZES.small,
        fontStyle: 'italic',
        color: COLORS.primary,
    },
};

export default styles;