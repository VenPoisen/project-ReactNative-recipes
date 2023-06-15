import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = {
    cardContainer: {
        backgroundColor: COLORS.lightWhite,
        margin: SIZES.medium,
        overflow: "hidden",
        borderRadius: SIZES.xxSmall,
    },
    recipeImage: {
        width: '100%',
        height: 200,
    },
    recipeDescriptionContainer: {
        padding: SIZES.medium,
    },
    recipeTitle: {
        fontSize: SIZES.large,
        fontFamily: FONT.bold,
        paddingBottom: SIZES.small,
    },
    recipeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    recipeButtonContainer: {
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: SIZES.small,
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.lightWhite,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: COLORS.tertiary,
    },
    editButton: {
        backgroundColor: COLORS.secondary,
    },
};

export default styles;