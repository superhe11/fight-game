import { GameLogic } from "./GameLogic/GameLogic";
import { Battlefield } from "./components/Battlefield/Battlefield";
import { RoundInfo } from "./components/RoundInfo/RoundInfo";
import { ActionButtons } from "./components/UnitActions/ActionButtons";
import "./styles/App.css";

export const App: React.FC = () => {
  const {
    battlefield,
    turnOrder,
    currentUnit,
    highlightedUnits,
    hoveredUnit,
    currentAction,
    animations,
    handleUnitClick,
    handleAction,
    confirmAction,
    handleHoverUnit,
  } = GameLogic();

  return (
    <div className="game">
      <Battlefield
        battlefield={battlefield}
        onUnitClick={handleUnitClick}
        highlightedUnits={highlightedUnits}
        currentUnit={currentUnit}
        hoveredUnit={hoveredUnit}
        actionType={currentAction ? currentAction.type : ""}
        animations={animations}
      />
      <RoundInfo
        turnOrder={turnOrder}
        currentUnit={currentUnit}
        onHoverUnit={handleHoverUnit}
      />
      <ActionButtons
        currentUnit={currentUnit}
        handleAction={handleAction}
        highlightedUnitsLength={highlightedUnits.length}
        currentAction={currentAction}
        confirmAction={confirmAction}
      />
    </div>
  );
};
